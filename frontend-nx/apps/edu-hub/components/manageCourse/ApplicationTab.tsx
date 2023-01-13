import { QueryResult } from "@apollo/client";
import { FC, useCallback, useMemo, useState } from "react";
import {
  ManagedCourse_Course_by_pk,
  ManagedCourse_Course_by_pk_CourseEnrollments,
} from "../../queries/__generated__/ManagedCourse";
import { ApplicationRow } from "./ApplicationRow";
import { greenDot, greyDot, orangeDot, redDot } from "../common/dots";
import { OnlyAdmin } from "../common/OnlyLoggedIn";
import {
  identityEventMapper,
  pickIdPkMapper,
  useAdminMutation,
  useRoleMutation,
  useUpdateCallback2,
} from "../../hooks/authedMutation";
import {
  UpdateEnrollmentRating,
  UpdateEnrollmentRatingVariables,
} from "../../queries/__generated__/UpdateEnrollmentRating";
import {
  UPDATE_ENROLLMENT_FOR_INVITE,
  UPDATE_ENROLLMENT_RATING,
} from "../../queries/insertEnrollment";
import { Button as OldButton } from "../common/Button";
import { Dialog, DialogTitle } from "@material-ui/core";
import { MdClose } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAdminQuery } from "../../hooks/authedQuery";
import { MailTemplates } from "../../queries/__generated__/MailTemplates";
import { INSERT_MAIL_LOG, MAIL_TEMPLATES } from "../../queries/mail";
import { displayDate } from "../../helpers/dateHelpers";
import {
  InsertMailLog,
  InsertMailLogVariables,
} from "../../queries/__generated__/InsertMailLog";
import {
  UpdateEnrollmentForInvite,
  UpdateEnrollmentForInviteVariables,
} from "../../queries/__generated__/UpdateEnrollmentForInvite";

interface IProps {
  course: ManagedCourse_Course_by_pk;
  qResult: QueryResult<any, any>;
}

const infoDots = (
  <>
    <div>Beurteilung der Bewerbung</div>
    <div className="grid grid-cols-6">
      <div>{greyDot} nicht bewertet</div>
      <div>{greenDot} Einladen</div>
      <div>{orangeDot} Review</div>
      <div>{redDot} Ablehnen</div>
      <div />
      <div />
    </div>
  </>
);

const now = new Date();
const now7 = new Date();
now7.setDate(now7.getDate() + 7);

export const ApplicationTab: FC<IProps> = ({ course, qResult }) => {
  const userRole = "instructor";

  const [selectedEnrollments, setSelectedEnrollments] = useState(
    [] as number[]
  );

  const [inviteExpireDate, setInviteExpireDate] = useState(now7);
  const handleSetInviteExpireDate = useCallback(
    (d: Date | null) => {
      setInviteExpireDate(d || new Date());
    },
    [setInviteExpireDate]
  );
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const handleCloseInviteDialog = useCallback(() => {
    setIsInviteDialogOpen(false);
  }, [setIsInviteDialogOpen]);
  const handleOpenInviteDialog = useCallback(() => {
    setIsInviteDialogOpen(true);
  }, [setIsInviteDialogOpen]);

  const queryMailTemplates = useAdminQuery<MailTemplates>(MAIL_TEMPLATES, {
    skip: false, // skip if user is only instructor
  });
  const mailTemplates = queryMailTemplates.data;
  if (queryMailTemplates.error) {
    console.log("fail to query mail templates!", queryMailTemplates);
  }

  const [insertMailLogMutation] = useAdminMutation<
    InsertMailLog,
    InsertMailLogVariables
  >(INSERT_MAIL_LOG);
  const [updateEnrollmentForInvite] = useRoleMutation<
    UpdateEnrollmentForInvite,
    UpdateEnrollmentForInviteVariables
  >(UPDATE_ENROLLMENT_FOR_INVITE, {
    context: {
      role: userRole,
    },
  });
  const handleSendInvites = useCallback(async () => {
    if (mailTemplates != null) {
      const inviteTemplate = mailTemplates.MailTemplate.find(
        (x) => x.title === "INVITE"
      );
      if (inviteTemplate != null) {
        const relevantEnrollments = selectedEnrollments
          .map((eid) => {
            const ce = course.CourseEnrollments.find((e) => e.id === eid);
            return ce;
          })
          .filter(
            (x) =>
              x != null && ["APPLIED", "INVITED", "REJECTED"].includes(x.status)
          ) as ManagedCourse_Course_by_pk_CourseEnrollments[];

        try {
          for (const enrollment of relevantEnrollments) {
            const template = { ...inviteTemplate };

            const doReplace = (source: string) => {
              return source
                .replaceAll("[User:Firstname]", enrollment.User.firstName)
                .replaceAll("[User:LastName]", enrollment.User.lastName)
                .replaceAll(
                  "[Enrollment:ExpirationDate]",
                  displayDate(inviteExpireDate)
                )
                .replaceAll("[Enrollment:CourseId--Course:Name]", course.title);
            };

            template.content = doReplace(inviteTemplate.content);
            template.subject = doReplace(inviteTemplate.subject);

            await insertMailLogMutation({
              variables: {
                bcc: template.bcc,
                cc: template.cc,
                content: template.content,
                from: template.from || "steffen@opencampus.sh",
                status: "READY_TO_SEND",
                subject: template.subject,
                to: enrollment.User.email,
              },
            });

            await updateEnrollmentForInvite({
              variables: {
                enrollmentId: enrollment.id,
                expire: inviteExpireDate,
              },
            });
          }
        } finally {
          qResult.refetch();
          setIsInviteDialogOpen(false);
        }
      } else {
        console.log("Missing mail template INVITE, cannot send invite mails!");
      }
    }
  }, [
    mailTemplates,
    selectedEnrollments,
    insertMailLogMutation,
    updateEnrollmentForInvite,
    qResult,
    setIsInviteDialogOpen,
    inviteExpireDate,
    course,
  ]);

  const handleSelectRow = useCallback(
    (enrollmentId: number, selected: boolean) => {
      if (selected) {
        if (!selectedEnrollments.includes(enrollmentId)) {
          const copy = [...selectedEnrollments];
          copy.push(enrollmentId);
          setSelectedEnrollments(copy);
        }
      } else {
        setSelectedEnrollments(
          selectedEnrollments.filter((id) => id !== enrollmentId)
        );
      }
    },
    [selectedEnrollments, setSelectedEnrollments]
  );

  const setEnrollmentRating = useUpdateCallback2<
    UpdateEnrollmentRating,
    UpdateEnrollmentRatingVariables
  >(
    UPDATE_ENROLLMENT_RATING,
    userRole,
    "enrollmentId",
    "rating",
    pickIdPkMapper,
    identityEventMapper,
    qResult
  );

  const courseEnrollments = useMemo(() => {
    const result = [...course.CourseEnrollments];
    result.sort((a, b) => a.id - b.id);
    return result;
  }, [course]);

  return (
    <>
      <div>
        <div className="mb-6">{infoDots}</div>

        <ApplicationRow
          enrollment={null}
          qResult={qResult}
          onSetRating={setEnrollmentRating}
          onSelectRow={handleSelectRow}
          isRowSelected={false}
        />

        {courseEnrollments.map((enrollment) => (
          <ApplicationRow
            key={enrollment.id}
            enrollment={enrollment}
            qResult={qResult}
            onSetRating={setEnrollmentRating}
            onSelectRow={handleSelectRow}
            isRowSelected={selectedEnrollments.includes(enrollment.id)}
          />
        ))}

        <div className="mt-6 mb-3">{infoDots}</div>

        <OnlyAdmin>
          <div className="flex justify-end mb-6">
            <OldButton onClick={handleOpenInviteDialog}>
              Einladungen verschicken
            </OldButton>
          </div>
        </OnlyAdmin>
      </div>

      <Dialog
        className="h"
        open={isInviteDialogOpen}
        onClose={handleCloseInviteDialog}
      >
        <DialogTitle>
          <div className="grid grid-cols-2">
            <div>Bewerber:innen einladen</div>
            <div className="cursor-pointer flex justify-end">
              <MdClose onClick={handleCloseInviteDialog} />
            </div>
          </div>
        </DialogTitle>

        <div className="m-16">
          <div className="grid grid-cols-2 h-64">
            <div className="mr-3">Ablaufdatum für Einladung:</div>
            <div className="ml-3">
              <DatePicker
                dateFormat={"dd/MM/yyyy"}
                selected={inviteExpireDate}
                onChange={handleSetInviteExpireDate}
                minDate={now}
              />
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <OldButton onClick={handleSendInvites}>Einladen</OldButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};
