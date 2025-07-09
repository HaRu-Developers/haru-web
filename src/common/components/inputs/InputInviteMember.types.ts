export interface InputInviteMemberProps {
  title: string;
  inputValue?: string;
  inputEmails?: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
  onEmailsChange?: (emails: string[]) => void;
  onInvite?: (emails: string[]) => void;
}
