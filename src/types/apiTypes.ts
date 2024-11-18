export interface getUserProps {
  code: string;
  detail: string;
  result: {
    email: string;
    name: string;
    role: string;
    provider: string;
  } | null;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface SignupProps {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export interface inviteClassroomProps {
  classroomId: number;
  guestEmail: string;
}
interface ModifiedCode {
  line: number;
  code: string;
}
export interface GptCorrectResponse {
  result: {
    reason: string;
    modified_codes: ModifiedCode[];
  };
}

export interface GptHintResponse {
  result: {
    hint: string;
    line: number;
  };
}

export interface ErrorResponse {
  code: string;
  detail: string;
  result: object;
}
