import { ProgramList } from '../../../../queries/__generated__/ProgramList';

interface FilteredProgramsResult {
  filteredPrograms: ProgramList['Program'];
  dateMap: Map<string, string[]>;
}

export const getFilteredProgramsAndDateMap = (
  programData: ProgramList | undefined,
  selectedTypes: { id: number; name: string }[]
): FilteredProgramsResult => {
  if (!programData?.Program) return { filteredPrograms: [], dateMap: new Map<string, string[]>() };

  const filteredPrograms =
    selectedTypes.length > 0
      ? programData.Program.filter((program) => selectedTypes.some((type) => type.name === program.type))
      : programData.Program;

  const dateMap = new Map<string, string[]>();
  filteredPrograms.forEach((program) => {
    if (program.lectureStart) {
      const date = new Date(program.lectureStart).toISOString().slice(0, 7);
      const existing = dateMap.get(date) || [];
      dateMap.set(date, [...existing, program.title]);
    }
  });

  return { filteredPrograms, dateMap };
};

export const formatChartDate = (date: string, dateMap: Map<string, string[]>) => {
  const programs = dateMap.get(date) || [];
  return `${programs.join(', ')}\n(${date})`;
};

export const getSortedPrograms = (programs: ProgramList['Program']) => {
  return [...programs].sort((a, b) => {
    const dateA = a.lectureStart ? new Date(a.lectureStart).getTime() : 0;
    const dateB = b.lectureStart ? new Date(b.lectureStart).getTime() : 0;
    return dateA - dateB;
  });
}; 