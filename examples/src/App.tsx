import "@hydrophobefireman/kit/styles";

// javascript is supported
import "./App.css";

import { css } from "catom";

import { _util } from "@hydrophobefireman/kit";
import { AlertRoot, useAlerts } from "@hydrophobefireman/kit/alerts";
import { AutoComplete } from "@hydrophobefireman/kit/autocomplete";
import { Button, ButtonProps } from "@hydrophobefireman/kit/button";
import { Container, Resource } from "@hydrophobefireman/kit/container";
import { Input, Switch, useSwitch } from "@hydrophobefireman/kit/input";
import {
  Checkbox,
  RadioGroup,
  RadioInput,
  useCheckbox,
} from "@hydrophobefireman/kit/input";
import { Text } from "@hydrophobefireman/kit/text";
import { useTheme } from "@hydrophobefireman/kit/theme";
import { VNode, render, useEffect, useState } from "@hydrophobefireman/ui-lib";

import { RouterTest } from "./RouterTest";

function A() {
  const { persist } = useAlerts();
  const [a, s] = useState(0);
  useEffect(() => {
    persist({
      preventClose: true,
      onActionClick: () => s((a: number) => a + 1),
      actionText: `Incr`,
      onCancelClick: console.log,
      content: "Hello world",
      type: "success",
    });
  }, [a]);
  return null;
}
function App(): VNode {
  const [name, setName] = useState("");
  const [refetch, setRefetch] = useState({});
  // debugger
  useEffect(() => {
    setTimeout(() => setName("John"), 1000);
  }, [refetch]);
  const [value, setValue] = useState(null);

  const { currentTheme, toggle } = useTheme();
  const { currentState, toggle: toggleSwitch } = useSwitch("intermediate");
  return (
    <>
      <AlertRoot>
        <A />
      </AlertRoot>
      <Container horizontal="center">
        <Switch
          label="OKAY"
          state={currentState}
          onInput={toggleSwitch}
          depends
          width="2rem"
          height="1rem"
        />
        <RadioGroup value={value} setValue={setValue} label="Time">
          <RadioInput errored={value !== "Now"} value="Now">
            OK
          </RadioInput>
          <RadioInput value="Tomorrow">Tmrw</RadioInput>
          <RadioInput value="Never">Soon</RadioInput>
        </RadioGroup>
      </Container>
      <Container horizontal="center" row>
        <AutoComplete
          dropdownClass={css({
            maxHeight: "300px",
            overflow: "auto",
          })}
          label="Search"
          mode="search"
          variant="material"
          options={[
            { value: "Things Fall Apart" },
            { value: "Fairy tales" },
            { value: "The Divine Comedy" },
            { value: "The Epic Of Gilgamesh" },
            { value: "The Book Of Job" },
            { value: "One Thousand and One Nights" },
            { value: "Njál's Saga" },
            { value: "Pride and Prejudice" },
            { value: "Le Père Goriot" },
            { value: "Molloy, Malone Dies, The Unnamable, the trilogy" },
            { value: "The Decameron" },
            { value: "Ficciones" },
            { value: "Wuthering Heights" },
            { value: "The Stranger" },
            { value: "Poems" },
            { value: "Journey to the End of the Night" },
            { value: "Don Quijote De La Mancha" },
            { value: "The Canterbury Tales" },
            { value: "Stories" },
            { value: "Nostromo" },
            { value: "Great Expectations" },
            { value: "Jacques the Fatalist" },
            { value: "Berlin Alexanderplatz" },
            { value: "Crime and Punishment" },
            { value: "The Idiot" },
            { value: "The Possessed" },
            { value: "The Brothers Karamazov" },
            { value: "Middlemarch" },
            { value: "Invisible Man" },
            { value: "Medea" },
            { value: "Absalom, Absalom!" },
            { value: "The Sound and the Fury" },
            { value: "Madame Bovary" },
            { value: "Sentimental Education" },
            { value: "Gypsy Ballads" },
            { value: "One Hundred Years of Solitude" },
            { value: "Love in the Time of Cholera" },
            { value: "Faust" },
            { value: "Dead Souls" },
            { value: "The Tin Drum" },
            { value: "The Devil to Pay in the Backlands" },
            { value: "Hunger" },
            { value: "The Old Man and the Sea" },
            { value: "Iliad" },
            { value: "Odyssey" },
            { value: "A Doll's House" },
            { value: "Ulysses" },
            { value: "The Trial" },
            { value: "The Castle" },
          ]}
        />
      </Container>

      <Resource resourceName="name" isPending={!name}>
        <Container
          element="main"
          class={[
            css({
              margin: "auto",
              width: "500px",
              height: "200px",
              border: "2px solid",
              marginTop: "20px",
            }),
          ]}
          horizontal="center"
          vertical="center"
        >
          <Container element="div" style={{ width: "100%" }}>
            <div>
              Hello <Text.strong depends>{name}</Text.strong>
            </div>
          </Container>
          <Button
            mode="secondary"
            depends
            label="Refetch"
            onClick={() => {
              setName("");
              setRefetch({});
            }}
          >
            Refetch
          </Button>

          <Container element="div" horizontal="center">
            <div>Current Theme is {currentTheme} </div>
            <Button
              label="Toggle"
              onClick={toggle}
              variant="shadow"
              mode="secondary"
            >
              Toggle
            </Button>
          </Container>
        </Container>
      </Resource>
      <Container style={{ marginTop: "2rem", flexWrap: "wrap" }} row>
        <TextButton
          class={css({ margin: ".5rem" })}
          text="Normal"
          variant="normal"
        />
        <TextButton
          style={{ "--kit-border": "blue" }}
          class={css({
            margin: ".5rem",
            pseudo: {
              ":hover": {
                transform: "scale(1.2)",
              },
            },
          })}
          text="Custom"
          variant="custom"
        />
        <TextButton
          class={css({ margin: ".5rem" })}
          text="Alert"
          mode="alert"
        />
        <TextButton
          class={css({ margin: ".5rem" })}
          text="Error"
          mode="error"
        />
        <TextButton
          class={css({ margin: ".5rem" })}
          text="Secondary"
          mode="secondary"
        />
        <TextButton
          class={css({ margin: ".5rem" })}
          text="Success"
          mode="success"
        />
        <TextButton
          class={css({ margin: ".5rem" })}
          text="Voilet"
          mode="voilet"
        />
        <TextButton
          class={css({ margin: ".5rem" })}
          text="Warning"
          mode="warning"
        />
      </Container>
      <Container horizontal="center">
        <RouterTest />
      </Container>
      <Container horizontal="center" row>
        <TestInput variant="material" placeholder="hello" />
        <TestInput variant="material" placeholder="hello" size="large" />
        <TestInput errored placeholder="hello" size="small" />
      </Container>
      <Resource isPending={true} resourceName="ok">
        <Container horizontal="center">
          <Text size={16} color="kit-highlight-pink">
            Hello World
          </Text>
        </Container>
      </Resource>
      <Container horizontal="center">
        <CheckboxTest />
      </Container>
    </>
  );
}
function CheckboxTest() {
  const { checked, toggle } = useCheckbox(false);
  return (
    <Checkbox checked={checked} onCheck={toggle} errored={!checked}>
      Hello
    </Checkbox>
  );
}
function TestInput(props: any) {
  const [value, setValue] = useState(props.value || "");
  return (
    <Input.Search
      {...props}
      value={value}
      setValue={setValue}
      errored={!!value.length}
      helperText={"Helper Text"}
    />
  );
}

function TextButton({
  text,
  ...rest
}: { text: string; class: any; [l: string]: any } & Omit<
  ButtonProps,
  "label"
>) {
  return (
    <Button
      style={{ fontSize: ".9rem" }}
      label={text}
      variant="shadow"
      {...rest}
    >
      {text}
    </Button>
  );
}

render(<App />, document.getElementById("app-mount"));
