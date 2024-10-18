import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
// import { fn } from '@storybook/test';
import { UserCircleIcon } from "../assets/icons";

import { Autocomplete } from "./Autocomplete.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Autocomplete",
  component: Autocomplete,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      story: {
        height: "400px",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const top10Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Godfather: Part III", year: 1976 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    id: "primary-autocomplete",
    className: "mt-1",
    label: "Pick a movie",
    options: top10Films,
    subtext: "Subtext example",
  },
};

export const OptionStartAdornment: Story = {
  args: {
    id: "autocomplete-with-option-adornment",
    className: "mt-1",
    label: "Elige un usuario",
    options: [
      { label: "Victor Díaz" },
      { label: "Jesús Milan" },
      { label: "Max Mendez" },
      { label: "Nicholas Yepes" },
    ].sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { numeric: true }),
    ),
    optionStartAdornment: ({ hovered }) => {
      return React.createElement(UserCircleIcon, {
        className: `mr-2 ${hovered ? "text-slate-900" : "text-gray-600"}`,
      });
    },
    subtext: "Solo podrás elegir a Victor para continuar.",
  },
};
