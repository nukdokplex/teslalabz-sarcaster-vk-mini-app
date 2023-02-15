import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Text, Link, Header, Button, Group, Cell, Div, Avatar, Textarea, Spacing, Snackbar } from '@vkontakte/vkui';
import { Icon16CopyOutline } from '@vkontakte/icons';

function alterCases(value) {
  let currentCap = Math.random() < 0.5;
  let result = "";

  [...value].forEach((e) => {
    result += currentCap ? e.toUpperCase() : e.toLowerCase();
    currentCap = !currentCap;
  });

  return result;
}

const HomePanel = ({ id, go, fetchedUser }) => {

  const [snackbar, setSnackbar] = useState(null);
  const [alteredValue, setAlteredValue] = useState("");

  const alteredTextarea = document.getElementById("altered_case__textarea");

  const handleInput = (e) => {
    console.log(e);
    setAlteredValue(alterCases(e.target.value));
  };

  const copy = (e) => {
    alteredTextarea.select();
    alteredTextarea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={
          <Avatar size={24} style={{ background: 'var(--vkui--color_background_accent)' }}>
            <Icon16CopyOutline fill="#fff" width={14} height={14} />
          </Avatar>
        }>
        Текст скопирован
      </Snackbar>
    );

  }

	return (
    <Panel id={id}>
		  <PanelHeader>Tesla Labz Sarcaster</PanelHeader>
		  <Group >
        <Text>
          Привет от <Link href="https://vk.com/nukdokplex" target="_blank">@nukdokplex</Link>!
          Это приложение создано для того чтобы делать текст ВоТ ТаКиМ ВоТ ПрЕкРаСнЫм и чУдЕсНыМ.  
        </Text>
      </Group>
      <Group>
        <Textarea
          placeholder="Введи сюда свой текст!" 
          grow={false}
          inputMode="text"
          onInput={handleInput}/>
        <Spacing size={16}/>
        <Textarea
          value={alteredValue}
          placeholder="Получи свой текст здесь!"
          grow={false}
          readOnly="readonly"
          id="altered_case__textarea"
          />
        <Spacing size={16}/>
        <center>
          <Button onClick={copy} before={<Icon16CopyOutline/>}>Скопировать</Button>
        </center>
      </Group>
      {snackbar}
	  </Panel>
  );
};

HomePanel.propTypes = {
	id: PropTypes.string.isRequired,
  setPopout: PropTypes.func.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default HomePanel;
