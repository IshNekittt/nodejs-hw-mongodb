import { ContactsCollection } from '../db/models/contact.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (page, perPage) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.countDocuments().merge(
    contactsQuery,
  );

  const contacts = await contactsQuery.skip(skip).limit(perPage);
  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id) => {
  return await ContactsCollection.findById(id);
};

export const postContact = async (payload) => {
  return await ContactsCollection.create(payload);
};

export const patchContact = async (id, payload) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
  };
};

export const deleteContact = async (id) => {
  return ContactsCollection.findOneAndDelete({ _id: id });
};
