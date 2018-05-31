import { create, clickable, fillable } from "ember-cli-page-object";

export default create({
  companyName: fillable("[data-test-client-company-name]"),
  address: fillable("[data-test-client-address]"),
  vatin: fillable("[data-test-client-vatin]"),
  contactName: fillable("[data-test-client-contact-name]"),
  contactEmail: fillable("[data-test-client-contact-email]"),
  delete: clickable("[data-test-client-delete]"),
  submit: clickable("[data-test-client-save]"),

  saveWith(attrs) {
    return this.companyName(attrs.companyName)
      .address(attrs.address)
      .vatin(attrs.vatin)
      .contactName(attrs.contactName)
      .contactEmail(attrs.contactEmail)
      .submit();
  }
});
