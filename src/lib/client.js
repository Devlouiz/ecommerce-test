import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '1j7mh6l1',
  dataset: 'production',
  apiVersion: '2024-04-16',
  useCdn: true,
  token: 'skfRcozpuqleQ6JUXLpr19tTys40kV1rcRD2ZZ2LF8hgnvISs0T0CWjIa5DBZloyMnq7F6VMnX9DGLf4LR0FDgN0qH3tm4FDW0ZKeX7i8WUmJ5gJEReW6ChAhEL0Ad64ZeRK66UlDkl96dkWiSBnZa2cjZdhAQieXsCkj62YDrO9ZaQvPp8L'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);