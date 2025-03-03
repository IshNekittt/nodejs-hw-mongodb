import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactById = async (id) => {
  return await ContactsCollection.findById(id);
};

export const postContact = async (payload) => {
  return await ContactsCollection.create(payload);
};
