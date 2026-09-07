const avatarModules = import.meta.glob('/src/assets/team/avatars/*.{jpg,jpeg,JPG,png}', { eager: true });

export function resolvePhoto(filename) {
  if (!filename) return null;
  const entry = Object.entries(avatarModules).find(([path]) => path.endsWith(`/${filename}`));
  return entry ? entry[1].default : null;
}

const MemberId = Object.freeze({
  ISHAAN_WASON: 'ISHAAN_WASON',
  ERNEST_BAKHCHINIAN: 'ERNEST_BAKHCHINIAN',
  MATEO_RACCO: 'MATEO_RACCO',
  MARK_GHAZI: 'MARK_GHAZI',
  ANDREW_FERRARA: 'ANDREW_FERRARA',
  AMOGH_MURUGAN: 'AMOGH_MURUGAN',
  MAURYA_SHAH: 'MAURYA_SHAH',
  YUMNA_NALEEM: 'YUMNA_NALEEM',
  CHARAN_KALYANA_SUNDARAM: 'CHARAN_KALYANA_SUNDARAM',
  TULIKA_SHARMA: 'TULIKA_SHARMA',
  CHARLOTTE_GRIECO: 'CHARLOTTE_GRIECO',
  FADEKEMI_ODU_ONIKOSI: 'FADEKEMI_ODU_ONIKOSI',
  JIANING_LI: 'JIANING_LI',
  ISABEL_CHELAIDITE: 'ISABEL_CHELAIDITE',
  SARGUN_BHATTI: 'SARGUN_BHATTI',
});

const MEMBERS = {
  [MemberId.ISHAAN_WASON]: { name: "Ishaan Wason", major: "ARBUS", photo: "Ishaan_Wason.JPG" },
  [MemberId.ERNEST_BAKHCHINIAN]: { name: "Ernest Bakhchinian", major: "Economics", photo: "Ernest_Bakhchinian.jpg" },
  [MemberId.MATEO_RACCO]: { name: "Mateo Racco", major: "ARBUS in Economics", photo: "Mateo_Racco.jpeg" },
  [MemberId.MARK_GHAZI]: { name: "Mark Ghazi", major: "Master of Arts in Economics", photo: "Mark_Ghazi.jpeg" },
  [MemberId.ANDREW_FERRARA]: { name: "Andrew Ferrara", major: "Economics and Business", photo: "Andrew_Ferrara.jpeg" },
  [MemberId.AMOGH_MURUGAN]: { name: "Amogh Mani Murugan", major: "Economics", photo: "Amogh_Murugan.jpeg" },
  [MemberId.MAURYA_SHAH]: { name: "Maurya Shah", major: "Science and Business", photo: "Maurya_Shah.jpg" },
  [MemberId.YUMNA_NALEEM]: { name: "Yumna Naleem", major: "Economics", photo: "Yumna_Naleem.jpeg" },
  [MemberId.CHARAN_KALYANA_SUNDARAM]: { name: "Charan Kalyana Sundaram", major: "Accounting and Financial Management", photo: "Charan_KS.png" },
  [MemberId.TULIKA_SHARMA]: { name: "Tulika Sharma", major: "Economics and Business", photo: "Tulika_Sharma.jpg" },
  [MemberId.CHARLOTTE_GRIECO]: { name: "Charlotte Grieco", major: "Math/FARM", photo: "Charlotte_Grieco.jpeg" },
  [MemberId.FADEKEMI_ODU_ONIKOSI]: { name: "Fadekemi Odu-Onikosi", major: "Mathematical Economics", photo: "Fadekemi_Odu-Onikosi.JPG" },
  [MemberId.JIANING_LI]: { name: "Jianing Li", major: "Master of Arts in Economics", photo: "Jianing_Li.jpeg" },
  [MemberId.ISABEL_CHELAIDITE]: { name: "Isabel Chelaidite", major: "Economics and Business", photo: "Isabel_Chelaidite.jpeg" },
  [MemberId.SARGUN_BHATTI]: { name: "Sargun Singh Bhatti", major: "Computer Science", photo: "Sargun_Bhatti.jpg" },
};

function member(id, role) {
  return { ...MEMBERS[id], role };
}

export const teamGroups = [
  {
    name: "Executive",
    members: [
      member(MemberId.ISHAAN_WASON, "Co-President"),
      member(MemberId.ERNEST_BAKHCHINIAN, "Co-President"),
    ],
  },
  {
    name: "Finance Team",
    members: [
      member(MemberId.MATEO_RACCO, "VP Finance"),
      member(MemberId.MARK_GHAZI, "Finance Coordinator"),
      member(MemberId.ANDREW_FERRARA, "Finance Coordinator"),
    ],
  },
  {
    name: "Event Team",
    members: [
      member(MemberId.AMOGH_MURUGAN, "VP Events"),
      member(MemberId.MAURYA_SHAH, "Events Coordinator"),
      member(MemberId.YUMNA_NALEEM, "Events Coordinator"),
      member(MemberId.CHARAN_KALYANA_SUNDARAM, "Events Coordinator"),
    ],
  },
  {
    name: "Research Team",
    members: [
      member(MemberId.TULIKA_SHARMA, "VP Research"),
      member(MemberId.CHARLOTTE_GRIECO, "Research Analyst"),
      member(MemberId.FADEKEMI_ODU_ONIKOSI, "Research Writer"),
      member(MemberId.JIANING_LI, "Research Analyst"),
    ],
  },
  {
    name: "Communications Team",
    members: [
      member(MemberId.ISABEL_CHELAIDITE, "VP Communications"),
    ],
  },
  {
    name: "Marketing Team",
    members: [
      { name: "TBD", role: "VP Marketing", major: "" },
    ],
  },
  {
    name: "Web Dev Team",
    members: [
      member(MemberId.JIANING_LI, "Web Developer"),
      member(MemberId.SARGUN_BHATTI, "Software Developer"),
    ],
  },
];

export const featuredMembers = [
  member(MemberId.ISHAAN_WASON, "Co-President"),
  member(MemberId.ERNEST_BAKHCHINIAN, "Co-President"),
  member(MemberId.MATEO_RACCO, "VP Finance"),
  member(MemberId.AMOGH_MURUGAN, "VP Events"),
  member(MemberId.TULIKA_SHARMA, "VP Research"),
  member(MemberId.ISABEL_CHELAIDITE, "VP Communications"),
];
