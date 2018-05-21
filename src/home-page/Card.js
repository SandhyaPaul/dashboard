import React from 'react';
import './card.css';

class Card extends React.PureComponent {
	render() {
		const { os, year, place, court, stage, nextCourtDate, caseType, caseSubtype } = this.props;
		const arr = [
			{ iconClass: 'fa-file-text-o', label: 'OS No', value: `${os}/${year}` },
			{ iconClass: 'fa-map-marker', label: 'Place', value: place },
			{ iconClass: 'fa-bank', label: 'Court', value: court },
			{ iconClass: 'fa-check', label: 'Stage', value: stage },
			{ iconClass: 'fa-calendar-check-o', label: 'Next Date', value: new Date(nextCourtDate).toDateString() },
			{ iconClass: 'fa-sitemap', label: 'Case Type', value: `${caseType} -> ${caseSubtype}` }
		];
		return (
			<div className="card card-raise">
				{arr.map(item => (
					<div className="card-row" key={item.label}>
						<span className="card-row-first-span">
							<i className={`fa ${item.iconClass}`} />
							<strong>{item.label}</strong>
						</span>
						<span className="card-row-second-span">{item.value}</span>
					</div>
				))}
			</div>
		);
	}
}

export { Card as TestCard };

export default Card;
