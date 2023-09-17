export type Form = {
  name: string;
  number: string;
};
export type Contact = {
  id: string;
  name: string;
  number: string;
};
export type ContactListProps = {
  contacts: Contact[];
  contactDelete: (id: string) => void;
};
export type HandleSubmitProps = {
  contactCreate: (contact: Form) => void;
};
