import { absences, members } from "../api.js";

export const getAbsenceInfo = async () => {
  const absenceData = await absences();
  const memberData = await members();
  const memberMap = {};
  memberData.forEach((member) => {
    memberMap[member.userId] = member;
  });
  const sortedData = absenceData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const absenceDetails = sortedData.map((user) => {
    let status = "Requested";
    if (user.confirmedAt) {
      status = "Confirmed";
    }
    if (user.rejectedAt) {
      status = "Rejected";
    }
    return {
      ...user,
      memberDetails: memberMap[user.userId],
      status,
    };
  });

  return {
    totalCount: absenceDetails.length,
    data: absenceDetails,
  };
};
