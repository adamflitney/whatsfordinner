import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";

export const MealForm: React.FC = () => {
  const navigate = useNavigate();
  const mealForm = useForm({
    defaultValues: {
      name: "",
      ingredients: [""],
      tags: [""],
      cost: "",
    },
    onSubmit: (data) => {
      console.log(data);
      api.meals.$post({ json: data.value });
      navigate({to: "/meals"});
    },
  });

  return (
    <>
      <h1 className="text-2xl font-semibold">Add a Meal</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          mealForm.handleSubmit();
        }}
        autoComplete="off"
        className="space-y-8"
      >
        <mealForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A name is required"
                : value.length < 3
                ? "Name must be at least 3 characters"
                : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") &&
                'No "error" allowed in name'
              );
            },
          }}
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Name:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length
                  ? <em>{field.state.meta.errors.join(", ")}</em>
                  : null}
              </>
            );
          }}
        />
        <mealForm.Field
          name="ingredients"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A list of ingredients is required"
                : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") &&
                'No "error" allowed in ingredients'
              );
            },
          }}
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Ingredients:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value.toString()}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value.split(","))}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length
                  ? <em>{field.state.meta.errors.join(", ")}</em>
                  : null}
              </>
            );
          }}
        />
        <mealForm.Field
          name="tags"
          validators={{
            onChange: () =>
              undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") &&
                'No "error" allowed in tags'
              );
            },
          }}
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Tags:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value.toString()}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value.split(","))}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length
                  ? <em>{field.state.meta.errors.join(", ")}</em>
                  : null}
              </>
            );
          }}
        />
        <mealForm.Field
          name="cost"
          validators={{
            onChange: () =>
              undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") &&
                'No "error" allowed in cost'
              );
            },
          }}
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Cost:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length
                  ? <em>{field.state.meta.errors.join(", ")}</em>
                  : null}
              </>
            );
          }}
        />
        <mealForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Create Meal'}
              </Button>
            )}
          />
        
      </form>
    </>
  );
};
