import { ChangeEvent, FormEvent, useState } from 'react';
import type { Form, HandleSubmitProps } from '@types';

const ContactForm = ({ contactCreate }: HandleSubmitProps) => {
  const [form, setForm] = useState({ name: '', number: '' });

  const handleInput = (e: ChangeEvent) => {
    const { name, value }: { name: string; value: string } = e.target as HTMLInputElement;
    setForm((prev: Form) => {
      return { ...prev, [name as keyof Form]: value };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    contactCreate(form);
    setForm({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit} className='flex w-[360px] flex-col gap-3'>
      <label className='flex flex-col'>
        Name:
        <input
          type='text'
          name='name'
          onChange={handleInput}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={form.name}
        />
      </label>
      <label className='flex flex-col'>
        Number:
        <input
          type='tel'
          name='number'
          onChange={handleInput}
          pattern='\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}'
          title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
          required
          value={form.number}
        />
      </label>
      <button className='bg-[#696969] py-2 text-white hover:bg-black'>Add contact</button>
    </form>
  );
};

export default ContactForm;
