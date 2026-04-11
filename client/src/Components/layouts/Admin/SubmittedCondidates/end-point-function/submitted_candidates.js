import {
  getWithPageService,
  deleteByIdService,
  updateByIdService,
} from "../../../../../utils/server_until/service.js";

export const getCandidateInfo = async (page) => {
  const res = await getWithPageService("api/dr/get", "candidate_info", page);

  console.log(res);

  return res;
};

// router.delete("/delete/id/:table/:id", deleteController);

export const deleteCandidate = async (id) => {
  const res = await deleteByIdService("api/dr/delete/id", "candidates", id);

  return res;
};

//  update candidate
// router.patch("/update/id/:table/:id", updateByIdController);

export const updateCandidate = async (data) => {
  const readyCandidate = {
    active: data.active,
    email: data.email,
    phone: data.phone,
    location: data.location,
    job_type: data.job_type,
    expected_ctc: data.expected_ctc,
    current_ctc: data.current_ctc,
    gender: data.gender,
    date_of_birth: data.date_of_birth,
    linkedin: data.linkedin,
    notice_period_days: data.notice_period_days,
    description: data.description,
    candidate_name: data.candidate_name,
    experience: data.experience,
  };

  const res = await updateByIdService(
    "api/dr/update/id",
    readyCandidate,
    "candidates",
    data.id,
  );

  return res;
};
