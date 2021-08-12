import React from 'react';
import Style from './VolunteerRequestComponent.module.css';
import { FormField, HandleFormFieldChange } from '../../objectModel/FormModel';

const textFieldSet = new Set([
  'color',
  'date',
  'datetime-local',
  'email',
  'month',
  'number',
  'password',
  'tel',
  'text',
  'time',
  'url',
  'week',
]);

const multiFieldSet = new Set(['checkbox', 'radio']);

interface Props {
  formField: FormField;
  handleChange: HandleFormFieldChange;
}

class FieldComponent extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
    this.handleInvalid = this.handleInvalid.bind(this);
  }

  handleInvalid(e: React.FormEvent<any>) {
    if (this.props.formField.validityChecker) {
      e.currentTarget.setCustomValidity('');
      e.currentTarget.setCustomValidity(
        this.props.formField.validityChecker(e),
      );
    }
  }

  public render() {
    const { formField, handleChange } = this.props;

    if (textFieldSet.has(formField.type)) {
      return (
        <label>
          <span className={formField.required ? Style.requiredLabel : ''}>
            {formField.label}
          </span>
          <input
            {...formField.htmlInputAttributes}
            type={formField.type}
            name={formField.name}
            required={formField.required}
            onChange={e => {
              handleChange(false, formField.name, e, formField.validityChecker);
            }}
            onInvalid={
              e => this.handleInvalid(e)
            }
          />
        </label>
      );
    }
    if (multiFieldSet.has(formField.type)) {
      return (
        <fieldset>
          <legend className={formField.required ? Style.requiredLabel : ''}>
            {formField.label}
          </legend>
          <div className={Style.optionList}>
            {formField.options?.map(option => (
              <label key={option.value}>
                <div className={Style.option}>
                  <input
                    {...formField.htmlInputAttributes}
                    type={formField.type}
                    name={formField.name}
                    value={option.value}
                    checked={option.default}
                    onChange={e => {
                      handleChange(
                        formField.type === 'checkbox',
                        formField.name,
                        e,
                        formField.validityChecker,
                      );
                    }}
                    onInvalid={
                      e => this.handleInvalid(e)
                    }
                  />
                  <span>{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      );
    }

    return null;
  }
}

export default FieldComponent;
