import "./Powersheet.css";
import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowDropleft,
  IoIosArrowDropright,
} from "react-icons/io";
import { BiSolidRightArrow } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

const Powersheet = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [reportCollapsed, setReportCollapsed] = useState(false);
	const [rawDataCollapsed, setRawDataCollapsed] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [showButtonExtend, setShowButtonExtend] = useState(false);
	const [selectedReportIndex, setSelectedReportIndex] = useState(null);
	const [selectedRawDataIndex, setSelectedRawDataIndex] = useState(null);
	const reportItems = {
		ViewAuto: "Top doanh số",
		Compare: "So sánh cùng kỳ",
		QuickReport: "Báo cáo nhanh"
	}
	const rawDataItems = {
		DbAuto: "Master data",
		// ViewAutoFull: "Sub master data",
	}

	const handleToggle = () => {
		setIsCollapsed(!isCollapsed);
		if (!isCollapsed) {
			setTimeout(() => setShowButtonExtend(true), 200);
		} else {
			setShowButtonExtend(false);
		}
	};

	const handleReportSelection = (index) => {
		setSelectedReportIndex(index);
		setSelectedRawDataIndex(null);
	};

	const handleRawDataSelection = (index) => {
		setSelectedReportIndex(null);
		setSelectedRawDataIndex(index);
	};

	const renderComponent = () => {
		if (selectedReportIndex !== null) {
			const selectedXtKey = Object.keys(reportItems)[selectedReportIndex];
			switch (selectedXtKey) {
				case "ViewAuto":
					return <ViewAutoComponent />;
				case "Compare":
					return <CompareComponent />;
				case "QuickReport":
					return <QuickReportComponent />;
				default:
					return null;
			}
		} else if (selectedRawDataIndex !== null) {
			const selectedRawDataKey = Object.keys(rawDataItems)[selectedRawDataIndex];
			switch (selectedRawDataKey) {
				case "DbAuto":
					return <DbAutoComponent />;
				case "ViewAutoFull":
					return <ViewAutoFullComponent />;
				default:
					return null;
			}
		} else if (selectedReportIndex !== null) {
			return <MaintainPage />;
		} else {
			return null;
		}
	};

	// HANDLE SEARCH
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredReportItems = Object.entries(reportItems).filter(([key, value]) =>
		value.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filteredRawDataItems = Object.entries(rawDataItems).filter(([key, value]) =>
		value.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// HANDLE COLLAPSED
	const handleReportToggle = () => {
		setReportCollapsed(!reportCollapsed);
	};

	const handleRawDataToggle = () => {
		setRawDataCollapsed(!rawDataCollapsed);
	};

	return (
		<div className="main">
			<div className="main-container">
				<div
				className={`file-list ${isCollapsed ? "collapsed" : ""}`}
				style={{ overflowY: "auto", maxHeight: "100vh" }}
				>
				<div className={`file-list-container ${isCollapsed ? "hidden" : ""}`}>
					<div className="button-collapse">
					<div className="search-area-wrap">
						<div className="search-area">
						<IoMdSearch className="IoMdSearch" />
						<input 
							type="text" 
							placeholder="Tìm kiếm sheet" 
							value={searchQuery} 
							onChange={handleSearchChange} 
						/>
						</div>
					</div>
					<div className="button-collapse-wrap">
						<button>
						<IoIosArrowDropleft
							className="IoIosArrowDropleft"
							onClick={handleToggle}
						/>
						</button>
					</div>
					</div>
					<div className="Omanager">
						<div className="Omanager-title">
							<div className="Omanager-title-span">
								<span>Report</span>
							</div>
							<div className="Omanager-title-button">
								<button
									className="button-collapse-extend"
									onClick={handleReportToggle}
								>
									{reportCollapsed ? 
									<IoIosArrowBack/>
									:
									<IoIosArrowDown/>
									}
								</button>
							</div>
						</div>
					<div className={`Omanager-elements ${reportCollapsed ? 'collapsed' : ''}`}>
						<div className="Omanager-elements-container">

						</div>
					</div>
					</div>
					<div className="Omanager">
						<div className="Omanager-title">
							<div className="Omanager-title-span">
								<span>Raw Data</span>
							</div>
							<div className="Omanager-title-button">
								<button
									className="button-collapse-extend"
									onClick={handleRawDataToggle}
								>
									{rawDataCollapsed ? 
									<IoIosArrowBack/>
									:
									<IoIosArrowDown/>
									}
								</button>
							</div>
						</div>
						<div className={`Omanager-elements ${rawDataCollapsed ? 'collapsed' : ''}`}>
							<div className="Omanager-elements-container">

							</div>
						</div>
					</div>
				</div>
				</div>
				<div className={`powersheet ${isCollapsed ? "" : "expanded"}`}>
					<div className="powersheet-container">{renderComponent()}</div>
				</div>
			</div>
			{showButtonExtend && (
				<div className="button-extend">
				<button>
					<IoIosArrowDropright
					className="IoIosArrowDropright"
					onClick={handleToggle}
					style={{marginRight: "20px"}}
					/>
				</button>
				</div>
			)}
		</div>
	);
};

export default Powersheet;
