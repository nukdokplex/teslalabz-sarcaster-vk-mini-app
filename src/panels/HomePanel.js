import React, { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import countapi from 'countapi-js';

import { Panel, PanelHeader, Text, Link, Header, Button, Group, Cell, Div, Avatar, Textarea, Spacing, Snackbar, Counter } from '@vkontakte/vkui';
import { Icon16CopyOutline, Icon24ExternalLinkOutline } from '@vkontakte/icons';

import "./HomePanel.css";
import kris from  "../img/kris.png";


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
  const [visitIssued, setVisitIssued] = useState(false);
  const [visits, setVisits] = useState(null);
  const [copies, setCopies] = useState(null);
  const [test, setTest] = useState(0);

  const alteredTextarea = document.getElementById("altered_case__textarea");

  useEffect(() => {
    if (!visitIssued){
      setVisitIssued(true);
      countapi.hit("teslalabz-sarcaster", "visits").then((result) => {
        if (result.status == 200) {
          setVisits(result.value.toString());
        }
        else {
          setVisits("N/A");
        }
      });
    }

    if (!copies){
      countapi.get("teslalabz-sarcaster", "copies").then((result) => {
        if (result.status == 200){
          setCopies(result.value.toString());
        }
        else {
          setCopies("N/A");
        }
      });
    }

  });

  const handleInput = (e) => {
    console.log(e);
    setAlteredValue(alterCases(e.target.value));
  };

  const copy = (e) => {
    alteredTextarea.select();
    alteredTextarea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    
    if (!snackbar) {
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
    countapi.hit("teslalabz-sarcaster", "copies").then((result) => {
      if (result.status == 200){
        setCopies(result.value.toString());
      }
    });
  }

	return (
    <Panel id={id}>
		  <PanelHeader>Tesla Labz Sarcaster</PanelHeader>
		  <Group>
        {fetchedUser && 
        <div style={{margin: '10px',}}>
          <Text weight='1' >
            Йоу, {fetchedUser.first_name} {fetchedUser.last_name}! 
            Это приложение скрафчено специально для тебя, чтобы ты 
            мог делать текст ВоТ ТаКиМ ВоТ ПрЕкРаСнЫм и чУдЕсНыМ!
          </Text>
        </div>}
      </Group>
      <Group>
        <Header mode='tertiary'>Конвертер</Header>
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
      {visits && copies &&
      <Group>
        <Header mode="tertiary">Статистика</Header>
        <Text style={{marginLeft: "13px", marginBottom: "10px"}}>
          Приложение открывалось уже {visits} раз(a)!
        </Text>
        <Text style={{marginLeft: "13px", marginBottom: "10px"}}>
          На кнопку «Скопировать» нажали уже {copies} раз(a)!
        </Text>
      </Group>}
      <Group>
        <div style={{margin: "10px"}}>
          <Text>
            Это проект с открытым исходным кодом, вы можете открыть 
            и редактировать код в <Link target='_blank' href="https://github.com/nukdokplex/teslalabz-sarcaster-vk-mini-app">GitHub репозитории<Icon24ExternalLinkOutline width={16} height={16} /></Link>
          </Text>
          <Spacing size={10}/>
          <Text>
            Пожалуйста, дайте проекту звезду, если вам понравилось!
          </Text>
        </div>
      </Group>
      <center>
        <img src={kris}></img>
      </center>
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
