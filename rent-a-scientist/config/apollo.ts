import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const authLink = setContext((_, { headers }) => {
  if (typeof window === "undefined") {
    return { headers };
  }

  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } else {
    return { headers };
  }
});

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Course: {
            merge: (_, incoming) => incoming,
          },
        },
      },
      Course: {
        fields: {
          applicationEnd: {
            merge: (_, applicationEnd) => {
              return new Date(applicationEnd);
            },
          },
          startTime: {
            merge: (_, val) => {
              return val != null ? new Date(val) : null;
            },
          },
          endTime: {
            merge: (_, val) => {
              return val != null ? new Date(val) : null;
            },
          },
          CourseInstructors: {
            merge: (_, incoming) => incoming,
          },
          CourseEnrollments: {
            merge: (_, incoming) => incoming,
          },
        },
      },

      CourseEnrollment: {
        fields: {
          invitationExpirationDate: {
            merge: (_, invitationExpirationDate) => {
              return invitationExpirationDate != null
                ? new Date(invitationExpirationDate)
                : null;
            },
          },
        },
      },
      Program: {
        fields: {
          applicationStart: {
            merge: (_, applicationStart) => {
              return applicationStart != null
                ? new Date(applicationStart)
                : null;
            },
          },
          applicationEnd: {
            merge: (_, applicationEnd) => {
              return applicationEnd != null ? new Date(applicationEnd) : null;
            },
          },
          defaultApplicationEnd: {
            merge: (_, defaultApplicationEnd) => {
              return defaultApplicationEnd != null
                ? new Date(defaultApplicationEnd)
                : null;
            },
          },
          lectureStart: {
            merge: (_, lectureStart) => {
              return lectureStart != null ? new Date(lectureStart) : null;
            },
          },
          lectureEnd: {
            merge: (_, lectureEnd) => {
              return lectureEnd != null ? new Date(lectureEnd) : null;
            },
          },
          achievementRecordUploadDeadline: {
            merge: (_, achievementRecordUploadDeadline) => {
              return achievementRecordUploadDeadline != null
                ? new Date(achievementRecordUploadDeadline)
                : null;
            },
          },
        },
      },
      Session: {
        fields: {
          startDateTime: {
            merge: (_, startDateTime) => {
              return new Date(startDateTime);
            },
          },
          endDateTime: {
            merge: (_, endDateTime) => {
              return new Date(endDateTime);
            },
          },
        },
      },
    },
  }),
});
