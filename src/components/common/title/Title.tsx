import React from 'react';
import './title.css'

interface TitleProps {
	checklistTitle: string
}

const Title = ({checklistTitle}: TitleProps) => (
	<h1 className={"checklist-title " + (checklistTitle === '' ? 'no-title' : '')}>{checklistTitle === '' ? 'Add a new checklist' : checklistTitle.substring(0, 1).toUpperCase() + checklistTitle.substring(1)}</h1>
);

export default Title;