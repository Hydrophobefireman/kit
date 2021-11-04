import "@hydrophobefireman/kit/styles";

// javascript is supported
import "./App.css";

import {css} from "catom";

import {_util} from "@hydrophobefireman/kit";
import {AlertRoot, useAlerts} from "@hydrophobefireman/kit/alerts";
import {
  AutoComplete,
  useAutoComplete,
} from "@hydrophobefireman/kit/autocomplete";
import {BottomSheet} from "@hydrophobefireman/kit/bottom-sheet";
import {
  Button,
  ButtonProps,
  TextButton as TB,
} from "@hydrophobefireman/kit/button";
import {Collapse, useCollapse} from "@hydrophobefireman/kit/collapse";
import {Box, Resource} from "@hydrophobefireman/kit/container";
import {FileDropTarget} from "@hydrophobefireman/kit/file-drop-target";
import {Input, Switch, useSwitch} from "@hydrophobefireman/kit/input";
import {
  Checkbox,
  RadioGroup,
  RadioInput,
  useCheckbox,
} from "@hydrophobefireman/kit/input";
import {Modal, useModal} from "@hydrophobefireman/kit/modal";
import {Select} from "@hydrophobefireman/kit/select";
import {Text} from "@hydrophobefireman/kit/text";
import {
  installLocalStorageReflection,
  installPreferenceReflection,
  useTheme,
} from "@hydrophobefireman/kit/theme";
import {
  VNode,
  render,
  useEffect,
  useRef,
  useState,
} from "@hydrophobefireman/ui-lib";

import {RouterTest} from "./RouterTest";

const sanitizeRegExp = /([^\w]|_)/g;
const clean = (x: any) => (x + "").replace(sanitizeRegExp, "").toLowerCase();
const contains = (b: any, a: any) => clean(b).includes(clean(a));
installLocalStorageReflection();
installPreferenceReflection();
function A() {
  const {persist} = useAlerts();
  const onClick = () => {
    persist({
      mask: true,
      actionText: `Ok`,
      onCancelClick: console.log,
      content: "Hello world",
      type: "success",
    });
  };
  return <TB onClick={onClick}>Open Snackbar</TB>;
}

function CollapseTest() {
  const {active, toggle} = useCollapse(false);
  return (
    <div>
      <Button mode="secondary" variant="shadow" label="toggle" onClick={toggle}>
        Toggle Collapse
      </Button>
      <Collapse active={active}>
        <div>{"Hello ".repeat(50)}</div>
      </Collapse>
    </div>
  );
}
function ThemeSwitcher({children}: any) {
  const [value, setValue] = useState(null);

  return (
    <div style={value ? {"--kit-theme-fg": value} : null}>
      <input type="color" onInput={(x) => setValue(x.currentTarget.value)} />
      {children}
    </div>
  );
}
function App(): VNode {
  const [name, setName] = useState("");
  const [refetch, setRefetch] = useState({});
  // debugger
  useEffect(() => {
    setTimeout(() => setName("John"), 1000);
  }, [refetch]);
  const [value, setValue] = useState(null);
  const {persist} = useAlerts();
  const {currentTheme, toggle} = useTheme();
  const {currentState, toggle: toggleSwitch} = useSwitch("intermediate");
  const {active, toggle: toggleModal, setActive} = useModal();
  const [files, setFiles] = useState<File[]>(null);
  const resetRef = useRef(null);
  const {setValue: setAcValue, value: acValue} = useAutoComplete("");

  const options = [
    {value: "Things Fall Apart"},
    {value: "Fairy tales"},
    {value: "The Divine Comedy"},
    {value: "The Epic Of Gilgamesh"},
    {value: "The Book Of Job"},
    {value: "One Thousand and One Nights"},
    {value: "Njál's Saga"},
    {value: "Pride and Prejudice"},
    {value: "Le Père Goriot"},
    {value: "Molloy, Malone Dies, The Unnamable, the trilogy"},
    {value: "The Decameron"},
    {value: "Ficciones"},
    {value: "Wuthering Heights"},
    {value: "The Stranger"},
    {value: "Poems"},
    {value: "Journey to the End of the Night"},
    {value: "Don Quijote De La Mancha"},
    {value: "The Canterbury Tales"},
    {value: "Stories"},
    {value: "Nostromo"},
    {value: "Great Expectations"},
    {value: "Jacques the Fatalist"},
    {value: "Berlin Alexanderplatz"},
    {value: "Crime and Punishment"},
    {value: "The Idiot"},
    {value: "The Possessed"},
    {value: "The Brothers Karamazov"},
    {value: "Middlemarch"},
    {value: "Invisible Man"},
    {value: "Medea"},
    {value: "Absalom, Absalom!"},
    {value: "The Sound and the Fury"},
    {value: "Madame Bovary"},
    {value: "Sentimental Education"},
    {value: "Gypsy Ballads"},
    {value: "One Hundred Years of Solitude"},
    {value: "Love in the Time of Cholera"},
    {value: "Faust"},
    {value: "Dead Souls"},
    {value: "The Tin Drum"},
    {value: "The Devil to Pay in the Backlands"},
    {value: "Hunger"},
    {value: "The Old Man and the Sea"},
    {value: "Iliad"},
    {value: "Odyssey"},
    {value: "A Doll's House"},
    {value: "Ulysses"},
    {value: "The Trial"},
    {value: "The Castle"},
  ];
  const noResult = acValue && options.every((x) => !contains(x.value, acValue));
  const [sv, setsv] = useState("");
  return (
    <>
      <Select
        value={sv}
        setValue={setsv as any}
        label="select value"
        buttonClass={css({width: "300px"})}
        options={[...options]}
        dropdownClass={css({maxHeight: "300px", overflow: "auto"})}
      />
      <FileDropTarget
        multiple
        onUpdate={(f, r) => {
          console.log(f);
          if (f[0].type.includes("html"))
            return persist({
              cancelText: "ok",
              content: "Invalid Content type",
              // actionText: "ok",
              mask: true,
              type: "error",
            });
          setFiles(f);
          resetRef.current = r;
        }}
      />
      {files && (
        <span>
          You uploaded:{" "}
          <ol>
            {files.map((x) => (
              <li>{x.name}</li>
            ))}
          </ol>
        </span>
      )}
      <CollapseTest />
      <Modal
        active={active}
        // onAnimationComplete={console.log}
        onClickOutside={() => setActive(false)}
      >
        <Modal.Body>
          <Modal.Title>Hello</Modal.Title>
          <Modal.Subtitle>Hello World</Modal.Subtitle>
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action autofocus>ok</Modal.Action>
          <Modal.Action onClick={toggleModal}>Close</Modal.Action>
        </Modal.Actions>
      </Modal>
      <Button
        onClick={toggleModal}
        label="Toggle"
        mode="secondary"
        variant="shadow"
      >
        Toggle
      </Button>
      <BottomSheetDemo />
      <BottomSheetDemo />
      <BottomSheetDemo />
      <BottomSheetDemo />
      <A />
      <Box horizontal="center">
        <Switch
          label="OKAY"
          state={currentState}
          onInput={toggleSwitch}
          depends
          width="2rem"
          height="1rem"
        />
        <Box horizontal="left">
          <RadioGroup
            as="Fragment"
            value={value}
            setValue={setValue}
            label="Time"
          >
            <RadioInput errored={value !== "Now"} value="Now">
              OK
            </RadioInput>
            <RadioInput value="Tomorrow">Tmrw</RadioInput>
            <RadioInput value="Never">Soon</RadioInput>
          </RadioGroup>
        </Box>
      </Box>
      <Box horizontal="center" row>
        <AutoComplete
          helperText="No results found"
          errored={noResult}
          value={acValue}
          setValue={setAcValue}
          dropdownClass={css({
            maxHeight: "300px",
            overflow: "auto",
          })}
          label="Search"
          mode="search"
          variant="material"
          options={options}
        />
      </Box>

      <Resource resourceName="name" isPending={!name}>
        <Box
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
          <Box element="div" style={{width: "100%"}}>
            <div>
              Hello <Text.strong depends>{name}</Text.strong>
            </div>
          </Box>
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

          <Box element="div" horizontal="center">
            <div>Current Theme is {currentTheme} </div>
            <Button
              label="Toggle"
              onClick={toggle}
              variant="shadow"
              mode="secondary"
            >
              Toggle
            </Button>
          </Box>
        </Box>
      </Resource>
      <Box style={{marginTop: "2rem", flexWrap: "wrap"}} row>
        <TextButton
          class={css({margin: ".5rem"})}
          text="Normal"
          variant="normal"
        />
        <TextButton
          style={{"--kit-border": "blue"}}
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
        <TextButton class={css({margin: ".5rem"})} text="Alert" mode="alert" />
        <TextButton class={css({margin: ".5rem"})} text="Error" mode="error" />
        <TextButton
          class={css({margin: ".5rem"})}
          text="Secondary"
          mode="secondary"
        />
        <TextButton
          class={css({margin: ".5rem"})}
          text="Success"
          mode="success"
        />
        <TextButton
          class={css({margin: ".5rem"})}
          text="Voilet"
          mode="voilet"
        />
        <TextButton
          class={css({margin: ".5rem"})}
          text="Warning"
          mode="warning"
        />
      </Box>
      <Box horizontal="center">
        <RouterTest />
      </Box>
      <Box horizontal="center" row>
        <TestInput variant="material" placeholder="hello" />
        <TestInput variant="material" placeholder="hello" size="large" />
        <TestInput errored placeholder="hello" size="small" />
      </Box>
      <Resource isPending={true} resourceName="ok">
        <Box horizontal="center">
          <Text size={16} color="kit-highlight-pink">
            Hello World
          </Text>
        </Box>
      </Resource>
      <Box horizontal="center">
        <CheckboxTest />
      </Box>
    </>
  );
}
function CheckboxTest() {
  const {checked, toggle} = useCheckbox(false);
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

function BottomSheetDemo() {
  const [s, setS] = useState(false);
  return (
    <div>
      <Button
        label="open"
        variant="shadow"
        mode="secondary"
        onClick={() => setS(true)}
      >
        Open
      </Button>
      <BottomSheet active={s} onDismiss={() => setS(false)}>
        <Box>
          {" "}
          <Text.h1>OK</Text.h1>
        </Box>{" "}
      </BottomSheet>
    </div>
  );
}
function TextButton({
  text,
  ...rest
}: {text: string; class: any; [l: string]: any} & Omit<ButtonProps, "label">) {
  return (
    <Button style={{fontSize: ".9rem"}} label={text} variant="shadow" {...rest}>
      {text}
    </Button>
  );
}

render(
  <ThemeSwitcher>
    <AlertRoot>
      <App />
    </AlertRoot>
  </ThemeSwitcher>,
  document.getElementById("app-mount")
);
