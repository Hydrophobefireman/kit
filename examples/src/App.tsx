import "@hydrophobefireman/kit/styles";

// javascript is supported
import "./App.css";

import { css } from "catom";

import { AutoComplete } from "@hydrophobefireman/kit/autocomplete";
import { Button, ButtonProps } from "@hydrophobefireman/kit/button";
import { Container, Resource } from "@hydrophobefireman/kit/container";
import { Input } from "@hydrophobefireman/kit/input";
import { useTheme } from "@hydrophobefireman/kit/theme";
import { VNode, render, useEffect, useState } from "@hydrophobefireman/ui-lib";

import { RouterTest } from "./RouterTest";

function App(): VNode {
  const [name, setName] = useState("");
  const [refetch, setRefetch] = useState({});
  useEffect(() => {
    setName("");
    setTimeout(() => setName("John"), 1000);
  }, [refetch]);
  const { currentTheme, toggle } = useTheme();
  return (
    <>
      <Resource
        resourceName="name"
        isPending={!name}
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
        <Container element="main">
          <Container element="div" style={{ width: "100%" }}>
            <div>
              Hello{" "}
              <Container
                depends
                element="div"
                style={{ display: "inline-block" }}
              >
                {name || "Loading"}
              </Container>
            </div>
          </Container>
          <Button
            mode="secondary"
            depends
            label="Refetch"
            onClick={() => {
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
        <AutoComplete
          label="Search"
          mode="search"
          variant="material"
          options={[
            { value: "ok" },
            {
              value: "hello",
              render() {
                return <div class={css({ color: "blue" })}>Heeeloo</div>;
              },
            },
          ]}
        />
      </Container>
      <Container horizontal="center" row>
        <TestInput variant="material" placeholder="hello" />
        <TestInput variant="material" placeholder="hello" size="large" />
        <TestInput errored placeholder="hello" size="small" />
      </Container>
    </>
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
