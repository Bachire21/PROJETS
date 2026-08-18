export type OrientationRequestStatus =
  | "nouvelle"
  | "en_cours"
  | "contactee"
  | "traitee"
  | "archivee";

export const orientationRequestStatuses: {
  value: OrientationRequestStatus;
  label: string;
}[] = [
  { value: "nouvelle", label: "NOUVELLE" },
  { value: "en_cours", label: "EN COURS" },
  { value: "contactee", label: "CONTACTÉE" },
  { value: "traitee", label: "TRAITÉE" },
  { value: "archivee", label: "ARCHIVÉE" },
];

export type OrientationRequest = {
  id: string;
  number: string;
  status: OrientationRequestStatus;
  firstName: string;
  lastName: string;
  country: string;
  whatsapp: string;
  email: string;
  diploma: string;
  diplomaYear?: string;
  level: string;
  field: string;
  desiredFormation?: string;
  targetLevel?: string;
  city: string;
  budget: string;
  housingBudget?: string;
  intake: string;
  needs: {
    orientation: boolean;
    admission: boolean;
    housing: boolean;
    welcome?: boolean;
    installation: boolean;
    administrative?: boolean;
  };
  alreadyAdmitted?: boolean;
  startedSteps?: boolean;
  message: string;
  consent?: boolean;
  notes: { id: string; text: string; createdAt: string }[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const seedOrientationRequests: OrientationRequest[] = [];