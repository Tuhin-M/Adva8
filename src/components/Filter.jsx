import React from "react";

function Filter({
  section,
  sectionIdx,
  activeFilters,
  setActiveFilters,
  activeFilterOptions,
  onUpdateFilter,
}) {
  const onChangeFilter = (type, value) => {
    if (isExisted(value)) {
      removeOption(value, type);
    } else {
      addOption(value, type);
    }
    onUpdateFilter();
  };

  const isExisted = (value) => {
    return activeFilterOptions.includes(value);
  };

  const addOption = (value, type) => {
    activeFilterOptions.push(value);
    updateFilter(type);
  };

  const removeOption = (value, type) => {
    let index = activeFilterOptions.indexOf(value);
    activeFilterOptions.splice(index, 1);
    updateFilter(type);
  };

  const updateFilter = (type) => {
    let updatedFilters = activeFilters.map((af) => {
      if (af.type == type) {
        af.options = activeFilterOptions;
      }
      return af;
    });
    setActiveFilters(updatedFilters);
  };

  return (
    <div key={section.name} className={sectionIdx === 0 ? null : "pt-10"}>
      <fieldset>
        <legend className="block text-sm font-medium text-gray-900">
          {section.name}
        </legend>
        <div className="space-y-3 pt-6">
          {section.options.map((option, optionIdx) => (
            <div
              key={`${option.value}- -${optionIdx}`}
              className="flex items-center"
            >
              <input
                id={`${section.id}-${optionIdx}`}
                name={`${section.id}[]`}
                defaultValue={option.value}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={() => onChangeFilter(section.id, option.value)}
                checked={isExisted(option.value)}
              />
              <label
                htmlFor={`${section.id}-${optionIdx}`}
                className="ml-3 text-sm text-gray-600"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Filter;
