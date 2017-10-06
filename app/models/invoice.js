import DS from "ember-data";
import InvoicePropertiesMixin from "fakturama/mixins/invoice-properties";

const { Model, attr } = DS;

export default Model.extend(InvoicePropertiesMixin, {
  itemsAttributes: attr(),
  number: attr("string"),
  issueDate: attr("string"),
  deliveryDate: attr("string"),
  dueDate: attr("string"),
  seller: attr("string"),
  buyer: attr("string"),
  currencyCode: attr("string"),
  languageCode: attr("string"),
  comment: attr("string"),
  sellerSignature: attr("string"),
  buyerSignature: attr("string"),
  exchangeRate: attr("number"),
  exchangeDate: attr("string"),
  exchangeDivisor: attr("number"),
  accountBankName: attr("string"),
  accountSwift: attr("string"),
  accountNumber: attr("string"),
  isPaid: attr("boolean")
});
