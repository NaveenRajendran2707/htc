export const inputHidden = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    value,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="hidden"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        value={value}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-400 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
        id="formFile"
      />
      {/* {defaultImage && (
        <div className="mt-2">
          <img
            src={defaultImage}
            alt="Uploaded logo"
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      )} */}
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputImgFile = (args) => {
  const {
    register,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
    defaultImage = "",
    onChange,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label
        className="block font-medium text-gray-800 mb-0.5 text-xs"
        htmlFor={name}
      >
        {label}
        {isRequired && <span className="text-red-500 ml-1 font-bold">*</span>}
      </label>

      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="file"
        accept="image/*"
        readOnly={!!readOnly}
        onChange={onChange}
        className={`block w-full text-sm text-gray-800 border-0 ring-1 ring-transparent rounded-[4px] cursor-pointer file:mr-3 file:rounded-[4px] file:border file:border-blue-600 file:bg-blue-50 file:py-1 file:px-2 file:text-sm file:font-semibold file:text-blue-600 ring-slate-300 placeholder:text-gray-400 hover:ring-blue-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
        id="formFile"
      />
      {defaultImage && (
        <div className="mt-2">
          <img
            src={defaultImage}
            alt="Uploaded logo"
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      )}
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputText = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    value,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
        {isRequired && <span className="text-red-500 ml-1 font-bold">*</span>}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        value={value}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
        autocomplete="off"
      />
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputPercentage = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    value,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
        {isRequired && <span className="text-red-500 ml-1 font-bold">*</span>}
      </label>
      <div className="relative mt-2">
        <input
          {...register(
            name,
            isRequired && { required: `${label} is required` }
          )}
          type="text"
          placeholder={`${placeholder}`}
          readOnly={!!readOnly}
          value={value}
          className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
            readOnly && "bg-slate-200"
          } ${inputClass}`}
          autocomplete="off"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm">%</span>
        </div>
      </div>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputSelect = (args) => {
  const {
    register,
    name,
    label,
    options,
    errors,
    isRequired = true,
    placeholder,
    readOnly,
    value,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
        disabled={readOnly}
        value={value}
      >
        <option value="">{placeholder || `Select ${label}`}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputPaymentSelect = (args) => {
  const {
    register,
    name,
    label,
    options,
    errors,
    isRequired = true,
    placeholder,
    readOnly,
    value,
    wrapperClass,
    inputClass,
    onChange,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
        disabled={readOnly}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder || `Select ${label}`}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputTel = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="tel"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      />
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputTextArea = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <textarea
        rows="5"
        cols="30"
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      />
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputNumber = (args) => {
  const {
    register,
    placeholder,
    errors,
    onChange,
    name,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="number"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        onChange={onChange ? (e) => onChange(e.target.value) : () => {}}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      />
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputEmail = (args) => {
  const {
    register,
    placeholder,
    errors,
    label,
    name,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, {
          required: `${label} is required`,
          pattern: {
            value: /\S+@\S+\.+\S+/,
            message: "Entered value does not match email format",
          },
        })}
        type="email"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      />
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputPassword = (args) => {
  const {
    register,
    placeholder,
    errors,
    watch,
    name,
    label,
    validate = false,
    isRequired = true,
    minLength = false,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, {
          required: isRequired ? `${label} is required` : null,
          minLength: minLength
            ? {
                value: 6,
                message: "Password must have at least 6 characters",
              }
            : null,
          validate: validate
            ? (value) =>
                value === watch().password || "The passwords do not match"
            : null,
        })}
        type="password"
        placeholder={`${placeholder}`}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${inputClass}`}
      />
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const dynamicInputSelect = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    data,
    isRequired = true,
    value,
    readOnly,
    wrapperClass,
    inputClass,
    onChange,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        onChange={onChange}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-400 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      >
        <option value="">Select {label}</option>
        {data &&
          data.map((d) => (
            <option key={d._id} value={d._id}>
              {d[value]}
            </option>
          ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const staticInputSelect = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    data,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      >
        <option value="">Select {label}</option>
        {data &&
          data.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const staticInputSelectCity = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    data,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
    onChange,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        onChange={onChange}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-400 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      >
        <option value="">Select {label}</option>
        {data &&
          data.map((d) => (
            <option key={d.name} value={d.name} data-shortname={d.shortName}>
              {d.name}
            </option>
          ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const dynaimcInputSelectField = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    data,
    label,
    value,
    isRequired = true,
    readOnly,
    wrapperClass,
    onChange,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
        onChange={onChange?(e)=>onChange(e.target.value):()=>{}}
      >
        <option value="">Select {label}</option>
        {data &&
          data.map((d) => (
            <option key={d.name} value={d.name}>
              {d[value]}
            </option>
          ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const staticInputSelectState = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    data,
    label,
    isRequired = true,
    readOnly,
    onChange,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        onChange={onChange}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      >
        <option value="">Select {label}</option>
        {data &&
          data.map((d) => (
            <option
              key={d._id}
              value={d.name}
              data-id={d._id}
              data-shortname={d.shortName}
            >
              {d.name}
            </option>
          ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputCheckBox = (args) => {
  const {
    register,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <div className="flex items-center mb-4">
        <input
          className={`w-4 h-4 text-blue-600 bg-white border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:outline-none dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
            readOnly && "bg-slate-200"
          } ${inputClass}`}
          type="checkbox"
          readOnly={!!readOnly}
          id={name}
          {...register(
            name,
            isRequired && { required: `${label} is required` }
          )}
        />
        <label
          className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-300"
          htmlFor={name}
        >
          {label}
        </label>
      </div>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputSwitch = (args) => {
  const {
    register,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="inline-flex items-center" htmlFor={name}>
        <input
          className={`sr-only peer ${readOnly && "bg-slate-200"} ${inputClass}`}
          type="checkbox"
          readOnly={!!readOnly}
          id={name}
          {...register(
            name,
            isRequired && { required: `${label} is required` }
          )}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        <span className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-300">
          {label}
        </span>
      </label>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputMultipleCheckBoxSwitchGroups = (args) => {
  const {
    register,
    errors,
    name,
    data,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
    checkedValues = [],
    onChange,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <div className="bg-white font-bold text-gray-400 py-3 flex flex-wrap items-center gap-2 sticky z-10 top-0">
        <div className="flex-0 w-40 inline-flex items-center">Module</div>
        <div className="flex-1 grid grid-cols-12">
          <div className="col-span-3 text-center">Edit</div>
          <div className="col-span-3 text-center">Add</div>
          <div className="col-span-3 text-center">List</div>
          <div className="col-span-3 text-center">Delete</div>
        </div>
      </div>
      {data &&
        // Group data by name
        Object.entries(
          data.reduce((acc, d) => {
            if (!acc[d.name]) {
              acc[d.name] = [];
            }
            acc[d.name].push(d);
            return acc;
          }, {})
        ).map(([groupName, groupItems]) => (
          <div key={groupName}>
            {/* Group name */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Render items in the group */}
              <div className="flex-0  w-40 inline-flex items-center mb-4">
                {groupName}
              </div>
              <div className="flex-1 grid grid-cols-12">
                {groupItems.map((d) => (
                  <div key={d._id} className="col-span-3 my-1 text-center">
                    <label
                      className="inline-flex text-center"
                      htmlFor={`check${d._id}${d.name
                        .toLowerCase()
                        .replace(/ /g, "_")}`}
                    >
                      <input
                        className={`sr-only peer ${
                          readOnly && "bg-slate-200"
                        } ${inputClass || ""}`}
                        type="checkbox"
                        readOnly={!!readOnly}
                        onChange={onChange}
                        id={`check${d._id}${d.name
                          .toLowerCase()
                          .replace(/ /g, "_")}`}
                        {...register(
                          name,
                          isRequired && { required: `${label} is required` }
                        )}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      <span className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-300"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputMultipleCheckBoxGroups = (args) => {
  const {
    register,
    errors,
    name,
    data,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
    checkedValues = [],
    onChange,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <div className="bg-white font-bold text-gray-400 py-3 flex flex-wrap items-center gap-2 sticky z-10 top-0">
        <div className="flex-0 w-40 inline-flex items-center">Module</div>
        <div className="flex-1 grid grid-cols-12">
          <div className="col-span-3 text-center">Edit</div>
          <div className="col-span-3 text-center">Add</div>
          <div className="col-span-3 text-center">List</div>
          <div className="col-span-3 text-center">Delete</div>
        </div>
      </div>
      {data &&
        // Group data by name
        Object.entries(
          data.reduce((acc, d) => {
            if (!acc[d.name]) {
              acc[d.name] = [];
            }
            acc[d.name].push(d);
            return acc;
          }, {})
        ).map(([groupName, groupItems]) => (
          <div key={groupName}>
            {/* Group name */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Render items in the group */}
              <div className="flex-0  w-40 inline-flex items-center mb-4">
                {groupName}
              </div>
              <div className="flex-1 grid grid-cols-12">
                {groupItems.map((d) => (
                  <div key={d._id} className="col-span-3 my-1 text-center">
                    <label
                      className="inline-flex text-center"
                      htmlFor={`check${d._id}${d.name
                        .toLowerCase()
                        .replace(/ /g, "_")}`}
                    >
                      <input
                        {...register(
                          name,
                          isRequired && { required: `${label} is required` }
                        )}
                        readOnly={!!readOnly}
                        className={`sr-only peer ${
                          readOnly && "bg-slate-200"
                        } ${inputClass || ""}`}
                        type="checkbox"
                        value={d._id}
                        id={`check${d._id}`}
                        onChange={onChange}
                        checked={checkedValues.includes(d._id)}
                      />
                      {/* {d.method}  */}
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      <span className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-300"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputMultipleCheckBoxGroupsChange = (args) => {
  const {
    register,
    errors,
    name,
    data,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
    checkedValues = [],
    onChange,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      {data &&
        data.map((d) => (
          <div key={d._id} className="flex flex-wrap items-center gap-2">
            <input
              {...register(
                name,
                isRequired && { required: `${label} is required` }
              )}
              readOnly={!!readOnly}
              className={`w-4 h-4 text-blue-600 bg-white border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:outline-none dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                readOnly && "bg-slate-200"
              } ${inputClass}`}
              type="checkbox"
              value={d._id}
              id={`check${d._id}`}
              // checked={checkedValues.includes(d._id)}
              onChange={onChange}
            />
            <label
              className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-300"
              htmlFor={`check${d._id}`}
            >
              {d.method} ({d.name})
            </label>
          </div>
        ))}
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputMultipleCheckBox = (args) => {
  const {
    register,
    errors,
    name,
    data,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      {data &&
        data.map((d) => (
          <div key={d._id} className="inline-flex w-1/2 items-center mb-4">
            <input
              {...register(
                name,
                isRequired && { required: `${label} is required` }
              )}
              className={`w-4 h-4 text-blue-600 bg-white border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:outline-none dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                readOnly && "bg-slate-200"
              } ${inputClass}`}
              type="checkbox"
              readOnly={!!readOnly}
              value={d._id}
              id={`check${d._id}`}
            />
            <label
              className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-300"
              htmlFor={`check${d._id}`}
            >
              {d.name}
            </label>
          </div>
        ))}
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputFile = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    isRequired = true,
    label,
    setFile,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="file"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
        id="formFile"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputDate = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="date"
        defaultValue={today}
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-400 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
        // min={`${minYear}-01-01`}
        // max={`${maxYear}-12-31`}
      />
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputDOB = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - 20;
  const minYear = currentYear - 100;
  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="date"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-400 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
        min={`${minYear}-01-01`}
        max={`${maxYear}-12-31`}
      />
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const InputAutoCompleteSelect = (args) => {
  const {
    register,
    id,
    placeholder,
    errors,
    name,
    data,
    label,
    onChange,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor="dataList">
        {label}
      </label>
      <input
        list={id}
        autoComplete="off"
        id="dataList"
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      />
      <datalist id={id}>
        <option value="">-------------</option>
        {data &&
          data.map((d) => (
            <option key={d._id} value={d.name}>
              {d.name}
            </option>
          ))}
      </datalist>

      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const dynamicInputSelectNumber = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    data,
    isRequired = true,
    readOnly,
    wrapperClass,
    inputClass,
  } = args;

  return (
    <div className={`mb-2 ${wrapperClass ? wrapperClass : ""}`}>
      <label className="block mb-0.5 text-xs font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-[4px] border-0 p-2 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 hover:ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-4 ${
          readOnly && "bg-slate-200"
        } ${inputClass}`}
      >
        <option value="select">Select</option>

        {[...Array(data).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-xs text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
