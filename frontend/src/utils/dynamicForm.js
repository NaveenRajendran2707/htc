export const inputHidden = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    isRequired = true,
    readOnly,
    value
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="hidden"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        value={value}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      />
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
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
    value
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        value={value}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      />
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
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
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="tel"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      />
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
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
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <textarea
        rows="5"
        cols="30"
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      />
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
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
    name,
    label,
    isRequired = true,
    readOnly,
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="number"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      />
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputEmail = (args) => {
  const { register, placeholder, errors, label, name, readOnly, } = args;

  return (
    <div className="mb-4">
      <label className="block mb-1" htmlFor={name}>
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
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      />
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
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
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
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
        className="block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6"
      />
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
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
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
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
        <span className="block text-sm text-red-600 pt-1">
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
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
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
        <span className="block text-sm text-red-600 pt-1">
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
    onChange
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        onChange={onChange}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      >
        <option value="">Select {label}</option>
        {data &&
          data.map((d) => (
            <option key={d._id} value={d.name} data-id={d._id}>
            {d.name}
          </option>
          ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputCheckBox = (args) => {
  const { register, errors, name, label, isRequired = true, readOnly, } = args;

  return (
    <div className="mb-3">
      <div className="flex items-center mb-4">
        <input
          className={`w-4 h-4 text-blue-600 bg-white border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:outline-none dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${readOnly && 'bg-slate-200'}`}
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
        <span className="block text-sm text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const inputMultipleCheckBoxGroups = (args) => {
  const { register, errors, name, data, label, isRequired = true, readOnly, } = args;

  return (
    <div className="mb-3">
      <div className="mb-3">
        {data &&
          data.map((d) => (            
            <div key={d._id} className="inline-flex w-1/4 items-center mb-4">
              <input
                {...register(
                  name,
                  isRequired && { required: `${label} is required` }
                )}
                readOnly={!!readOnly}
                className={`w-4 h-4 text-blue-600 bg-white border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:outline-none dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${readOnly && 'bg-slate-200'}`}
                type="checkbox"
                value={d._id}
                id={`check${d._id}`}
              />              
              <label
                className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-300"
                htmlFor={`check${d._id}`}
              >
                {d.method} ({d.name})
              </label>
            </div>            
          ))}
      </div>
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};


export const inputMultipleCheckBox = (args) => {
  const { register, errors, name, data, label, isRequired = true, readOnly, } = args;

  return (
    <div className="mb-3">
      <div className="mb-3">
        {data &&
          data.map((d) => (
            <div key={d._id} className="inline-flex w-1/2 items-center mb-4">
              <input
                {...register(
                  name,
                  isRequired && { required: `${label} is required` }
                )}
                className={`w-4 h-4 text-blue-600 bg-white border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:outline-none dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${readOnly && 'bg-slate-200'}`}
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
      </div>
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
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
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="file"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
        id="formFile"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
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
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type="date"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      />
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export const InputAutoCompleteSelect = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    data,
    label,
    isRequired = true,
    readOnly,
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor="dataList">
        {label}
      </label>
      <input
        list="datalistOptions"
        autoComplete="off"
        id="dataList"
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      />
      <datalist id="datalistOptions">
        <option value="">-------------</option>
        {data &&
          data.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
      </datalist>

      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
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
  } = args;

  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type="text"
        placeholder={`${placeholder}`}
        readOnly={!!readOnly}
        className={`block w-full rounded-md border-0 py-2 px-3 text-gray-800 focus:shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6 ${readOnly && 'bg-slate-200'}`}
      >
        <option value="select">Select</option>

        {[...Array(data).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <span className="block text-sm text-red-600 pt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
