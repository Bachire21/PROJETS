"use client";

import type { StudentFormData } from "@/data/find-school";
import { countries } from "@/data/find-school";
import { Field, SelectField } from "./fields";
import {
  GlobeIcon,
  MailIcon,
  UserIcon,
  WhatsAppIcon,
} from "@/components/icons";

type PersonalInfoStepProps = {
  data: StudentFormData;
  onChange: (key: keyof StudentFormData) => (value: string) => void;
  errors: Record<string, string>;
};

export function PersonalInfoStep({
  data,
  onChange,
  errors,
}: PersonalInfoStepProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field
        id="firstName"
        label="Prénom"
        required
        icon={<UserIcon className="h-4.5 w-4.5" />}
        placeholder="Ton prénom"
        value={data.firstName}
        onChange={onChange("firstName")}
        error={errors.firstName}
        valid={Boolean(data.firstName.trim())}
        autoComplete="given-name"
      />
      <Field
        id="lastName"
        label="Nom"
        required
        icon={<UserIcon className="h-4.5 w-4.5" />}
        placeholder="Ton nom"
        value={data.lastName}
        onChange={onChange("lastName")}
        error={errors.lastName}
        valid={Boolean(data.lastName.trim())}
        autoComplete="family-name"
      />
      <SelectField
        id="country"
        label="Pays de résidence"
        required
        icon={<GlobeIcon className="h-4.5 w-4.5" />}
        value={data.country}
        onChange={onChange("country")}
        options={countries}
        error={errors.country}
      />
      <Field
        id="whatsapp"
        label="WhatsApp"
        required
        icon={<WhatsAppIcon className="h-4.5 w-4.5" />}
        placeholder="+226 00 00 00 00"
        value={data.whatsapp}
        onChange={onChange("whatsapp")}
        error={errors.whatsapp}
        valid={Boolean(data.whatsapp.trim())}
        autoComplete="tel"
        inputMode="tel"
      />
      <div className="sm:col-span-2">
        <Field
          id="email"
          label="E-mail"
          required
          icon={<MailIcon className="h-4.5 w-4.5" />}
          placeholder="tonadresse@email.com"
          type="email"
          value={data.email}
          onChange={onChange("email")}
          error={errors.email}
          valid={Boolean(data.email.trim())}
          autoComplete="email"
          inputMode="email"
        />
      </div>
    </div>
  );
}