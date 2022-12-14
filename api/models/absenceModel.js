import { absences, members } from '../api.js'

export const getAbsenceInfo = async(absenceRequest) => {
    // const { offset, limit, startDate, endDate, status, type} = absenceRequest;
    const absenceData = await absences();
    const memberData = await members();
    const memberMap = {};
    memberData.forEach(member => {
        memberMap[member.userId] = member;
    });
    const sortedData = absenceData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const slicedPart = sortedData.map(user => {
        let status = 'Requested'
        if (user.confirmedAt) {
            status = 'Confirmed'
        }
        if (user.rejectedAt) {
            status = 'Rejected'
        }
// if(user.startDate) {
//     user.startDate = new Date(user.startDate);
// }

// if(user.endDate) {
//     user.endDate = new Date(user.endDate);
// }
 
        return {
            ...user,
            memberDetails: memberMap[user.userId],
            status
        }
    });
    
    return {
        totalCount: slicedPart.length,
        data: slicedPart
    }
    // let filteredData = slicedPart;
    // if(type) {
    //     filteredData = filteredData.filter((data)=> data.type === type);
    // }
    // if(status) {
    //     filteredData = filteredData.filter((data)=> data.status === status);
    // }
    // if (startDate && endDate) {
    //     const filterStart = new Date(startDate)
    //     const filterEnd = new Date(endDate)
    //     filteredData = filteredData.filter((data) => {
    //       const start = new Date(data.startDate)
    //       const end = new Date(data.endDate)
    //       return start >= filterStart && end <= filterEnd
    //     })
    //   }
    //   if (startDate) {
    //     filteredData = filteredData.filter((data) => data.startDate === startDate);
    //   }
    //   if (endDate) {
    //     filteredData = filteredData.filter((data) => data.endDate === endDate);
    //   }
    // return {
    //     totalCount: filteredData.length,
    //     data: filteredData.slice(offset,limit)
    // }
}