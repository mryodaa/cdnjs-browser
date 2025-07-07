import { useFieldStore } from "../models/model";
import s from "./FieldFilter.module.scss";

const OPTIONS = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
  { label: "Keywords", value: "keywords" },
  { label: "Filename", value: "filename" },
];

export const FieldFilter = () => {
  const fields = useFieldStore((s) => s.fields);
  const toggle = useFieldStore((s) => s.toggle);

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "1rem",
      }}
    >
      {OPTIONS.map(({ label, value }) => (
        <label className={s.checkboxLabel} key={value}>
          <input
            type="checkbox"
            checked={fields.includes(value)}
            onChange={() => toggle(value)}
            className={s.checkbox}
          />
          {label}
        </label>
      ))}
    </div>
  );
};
