import React from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form";
import { AddressInput } from "../address-input";
import {
  Controller as Controller,
  useFormContext as useFormContext,
} from "react-hook-form";
import { ErrorText } from "../error-text";

interface Props {
  className?: string;
}

export const CheckoutAdresForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />{" "}
              {fieldState.error && (
                <ErrorText text={fieldState.error.message!} />
              )}
            </>
          )}
        />
        <FormTextarea
          rows={5}
          className="text-base"
          name="comment"
          placeholder="Комментарии к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
