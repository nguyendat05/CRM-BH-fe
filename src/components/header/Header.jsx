import "./Header.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationModal from "../modal/ConfirmationModal";
import { toast } from "react-toastify";
import { logout } from "../../apis/userService";
import logoPng from "../../../public/logo.png"

// context
import StoreContext from "../../store/Context";

function Header({ searchTerm, setSearchTerm }) {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const menuRef = useRef(null);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [state, dispatch] = useContext(StoreContext);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIfMobile = () => {
			const userAgent = navigator.userAgent.toLowerCase();
			setIsMobile(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
		};

		checkIfMobile();
		window.addEventListener('resize', checkIfMobile);

		return () => {
			window.removeEventListener('resize', checkIfMobile);
		};
	}, []);

	const handleLogout = () => {
		setShowMenu(false);
		setShowLogoutModal(true);
	};

	const handleConfirmLogout = async () => {
		try {
			await logout();
			dispatch({ type: "LOGOUT" });
		} catch (error) {
			console.error("Error logging out:", error);
			toast.error("Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại sau!", {
				position: "bottom-center",
			});
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		};

		if (showMenu) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showMenu]);

	return (
		<div className="header">
			<div className="header_container">
				<div className="header_logo">
					<span>The</span>
					<br />
					<span>Bookstop</span>
					{/* <img src={logoPng} alt="Cenica CRM Logo" /> */}
				</div>
				<div className="header_general-function">
					<div className="header_general-function-left">
						{!isMobile && (
							<NavLink
								to="/powersheet"
								className={({ isActive }) =>
									isActive ? "header_button-selected" : ""
								}
							>
								Powersheet
							</NavLink>
						)}
					</div>
					{isMobile && (
						<div className="header_search-bar">
							<input
								type="text"
								className="search"
								placeholder="Tìm kiếm"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					)}
					<div className="user-info">
						{!isMobile && (
							<span>
								Xin chào{" "}
								<strong>
									<i>{state.currentUser?.name || ""}</i>
								</strong>
							</span>
						)}
						<img
							src={state.currentUser?.picture || ""}
							alt="Profile"
							onClick={() => setShowMenu(!showMenu)}
							className="profile-image"
						/>
						{showMenu && (
							<div ref={menuRef} className="dropdown-menu">
								<button className="logout-button" onClick={handleLogout}>
									Đăng xuất
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			{showLogoutModal && (
				<ConfirmationModal
					isOpen={showLogoutModal}
					message="Hãy lưu dữ liệu trước khi Đăng xuất !!"
					onConfirm={handleConfirmLogout}
					onCancel={() => setShowLogoutModal(false)}
				/>
			)}
		</div>
	);
}

export default Header;