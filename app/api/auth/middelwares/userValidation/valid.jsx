import vine from "@vinejs/vine";

const schema = vine.object({
  FirstName: vine.string(),
  LastName: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});

const validator = vine.compile(schema);

export default validator;
