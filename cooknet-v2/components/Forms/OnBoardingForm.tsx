"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { object, z } from "zod";
import { useState } from "react";
import { CreateUser, CreateUserPayload } from "@/app/actions/UserActions";

const RegistrationSchema = object({
  clan: z.string(),
  referral: z.string(),
});

type RegistrationForm = z.infer<typeof RegistrationSchema>;

const referralOptions = [
  "Charles Rossouw told me to Join",
  "A Family Member told me about the app",
  "A friend recommended it to me",
  "@Charlesrossouw posted about it on Social Media",
  "A friend posted about it on Social Media",
];

export default function OnBoardingForm({
  id,
  username,
}: {
  id: string;
  username: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  const ingredientForm = useForm<RegistrationForm>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      clan: "",
      referral: "",
    },
  });

  const handleSubmit = async (input: RegistrationForm) => {
    const userPayload: CreateUserPayload = {
      id: id,
      familyClan: input.clan,
      referral: input.referral,
      username: username || "No Username",
    };

    const res = await CreateUser(userPayload);

    if (res.error) return setError(res.error);
    if (res.data) return router.push("/");
  };

  return (
    <Card className="flex flex-col justify-center items-center">
      <Form {...ingredientForm}>
        <form onSubmit={ingredientForm.handleSubmit(handleSubmit)} className="">
          <CardHeader className="text-center">
            <CardTitle>Welcome to CookNet!</CardTitle>
            <CardDescription>
              We just need a few more details and you're ready to go!
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full flex justify-center items-center flex-col gap-5">
            {/* Search Field */}
            <FormField
              control={ingredientForm.control}
              name="clan"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Your Family Clan (Surname)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Rossouws" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ingredientForm.control}
              name="referral"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>How did you find out about CookNet?</FormLabel>
                  <FormControl className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Option" />
                      </SelectTrigger>
                      <SelectContent>
                        {referralOptions.map((option, index) => (
                          <SelectItem
                            //   className="text-sm"
                            key={index}
                            value={option}
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center items-center flex-col gap-3">
            <Button className="w-full" type="submit">
              Let me Cook
            </Button>
            <p className="font-semibold text-destructive">{error && error}</p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
