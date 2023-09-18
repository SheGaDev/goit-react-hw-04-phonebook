import { ChangeEvent, useEffect, useState } from 'react';
import ContactForm from '../contact-form/ContactForm';
import Filter from '../filter/Filter';
import ContactList from '../contact-list/ContactList';
import { nanoid } from 'nanoid';
import type { Form, Contact } from '@types';

const fetchContacts = (): Contact[] => {
  return JSON.parse(localStorage.getItem('contacts') as string) ?? [];
};

const App = () => {
  const [contacts, setContacts] = useState(fetchContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactCreate = (contact: Form) => {
    if (contacts.some((cont) => cont.name.toLowerCase() === contact.name.toLowerCase())) {
      alert(`${contact.name} is arleady in contacts.`);
      return;
    }
    setContacts((prev: Contact[]): Contact[] => {
      return [...prev, { ...contact, id: nanoid() }] as Contact[];
    });
  };

  const contactDelete = (id: string) => {
    setContacts((prev: Contact[]): Contact[] => {
      return prev.filter((contact) => contact.id !== id);
    });
  };

  const filterChange = (event: ChangeEvent) => {
    const { value }: { value: string } = event.target as HTMLInputElement;
    setFilter(value);
  };

  const contactFiltered = (): Contact[] => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
  };

  return (
    <>
      <div className='m-4 flex flex-col gap-4'>
        <h1>
          <b>Phonebook</b>
        </h1>
        <ContactForm contactCreate={contactCreate} />
      </div>
      <div className='m-4 flex flex-col gap-4'>
        <h2>
          <b>Contacts</b>
        </h2>
        <div className='flex flex-col'>
          <Filter filter={filterChange} />

          <ContactList contacts={contactFiltered()} contactDelete={contactDelete} />
        </div>
      </div>
    </>
  );
};

export default App;
