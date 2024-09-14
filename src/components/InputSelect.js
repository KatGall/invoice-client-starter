import React from "react";

export function InputSelect(props) {
  const { multiple, required = false, value, items, prompt, handleChange, name } = props;

  const emptySelected = multiple ? value?.length === 0 : !value;

  return (
    <div className="form-group">
      <label>{props.label}:</label>
      <select
        required={required}
        className="browser-default form-select"
        multiple={multiple}
        name={name}
        onChange={handleChange}
        value={value}
      >
        {required ? (
          <option disabled value="">
            {prompt}
          </option>
        ) : (
          <option value="">
            {prompt}
          </option>
        )}

        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default InputSelect;
