import { useState } from 'react';
import {
    FaChevronRight, FaChevronDown,
    FaUserPlus, FaUsers, FaTools, FaClone, FaBolt,
    FaList, FaCar, FaCog, FaFolderPlus, FaTachometerAlt
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const styles = {
    sidebar: (collapsed) => ({
        width: collapsed ? "70px" : "250px",
        height: "100%",
        backgroundColor: "#1f2d3d",
        color: "#ecf0f1",
        padding: "20px 0",
        fontFamily: "'Segoe UI', sans-serif",
        overflowY: "auto",
        transition: "width 0.3s ease"
    }),
    topLink: (collapsed) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        padding: "12px 20px",
        color: "#ffffff",
        fontWeight: 600,
        textDecoration: "none",
        transition: "all 0.3s ease"
    }),
    sectionTitle: (collapsed) => ({
        display: "flex",
        alignItems: "center",
        padding: collapsed ? "12px 20px" : "12px 20px",
        justifyContent: collapsed ? "center" : "flex-start",
        cursor: "pointer",
        fontWeight: 600,
        color: "#b0bec5",
        transition: "all 0.2s"
    }),
    linkIcon: {
        fontSize: "16px",
        marginRight: "10px"
    },
    link: (collapsed) => ({
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        justifyContent: collapsed ? "center" : "flex-start",
        textDecoration: "none",
        color: "#cfd8dc",
        fontSize: "14px",
        borderRadius: "6px",
        transition: "all 0.2s"
    }),
    linkActive: {
        backgroundColor: "#0d6efd",
        color: "#fff"
    }
};

const SidebarSection = ({ title, icon: Icon, links, collapsed }) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    return (
        <div>
            <div
                style={styles.sectionTitle(collapsed)}
                onClick={() => !collapsed && setOpen(!open)}
            >
                <Icon style={styles.linkIcon} />
                {!collapsed && <span>{title}</span>}
                {!collapsed && (
                    open
                        ? <FaChevronDown style={{ marginLeft: "auto", fontSize: "12px" }} />
                        : <FaChevronRight style={{ marginLeft: "auto", fontSize: "12px" }} />
                )}
            </div>

            {!collapsed && open && (
                <div style={{ paddingLeft: "20px" }}>
                    {links.map(({ label, to }, idx) => {
                        const isActive = location.pathname === to;
                        return (
                            <Link
                                to={to}
                                key={idx}
                                style={{
                                    ...styles.link(collapsed),
                                    ...(isActive ? styles.linkActive : {})
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2c3e50'}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = isActive ? '#0d6efd' : 'transparent';
                                    e.currentTarget.style.color = isActive ? '#fff' : '#cfd8dc';
                                }}
                            >
                                {!collapsed && <span>{label}</span>}
                            </Link>
                        );
                    })}
                </div>
            )}


        </div>
    );
};

export default function Sidebar({ collapsed }) {
    return (
        <aside style={styles.sidebar(collapsed)}>
            <Link
                to="/admin/dashboard"
                style={styles.topLink(collapsed)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d6efd'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <FaTachometerAlt style={styles.linkIcon} />
                {!collapsed && <span>Dashboard</span>}
            </Link>

            <SidebarSection
                title="User"
                icon={FaUsers}
                links={[
                    { label: "Add User", icon: FaUserPlus, to: "/admin/add-user" },
                    { label: "View Users", icon: FaUsers, to: "/admin/users" }
                ]}
                collapsed={collapsed}
            />
            {/* 
            <SidebarSection
                title="Menus"
                icon={FaList}
                links={[
                    { label: "Add Menu", icon: FaUserPlus, to: "/admin/add-menu" },
                    { label: "View Menus", icon: FaList, to: "/admin/view-menus" }
                ]}
                collapsed={collapsed}
            /> */}

            <SidebarSection
                title="Categories"
                icon={FaFolderPlus}
                links={[
                    { label: "Add Category", icon: FaUserPlus, to: "/admin/add-category" },
                    { label: "View Categories", icon: FaFolderPlus, to: "/admin/view-categories" }
                ]}
                collapsed={collapsed}
            />
            <SidebarSection
                title="Make"
                icon={FaTools}
                links={[
                    { label: "Add Make", icon: FaUserPlus, to: "/admin/add-make" },
                    { label: "View Make", icon: FaFolderPlus, to: "/admin/view-make" }
                ]}
                collapsed={collapsed}
            />
            <SidebarSection
                title="Model"
                icon={FaClone}
                links={[
                    { label: "Add Model", icon: FaUserPlus, to: "/admin/add-model" },
                    { label: "View Model", icon: FaFolderPlus, to: "/admin/view-model" }
                ]}
                collapsed={collapsed}
            />
            <SidebarSection
                title="Version"
                icon={FaBolt}
                links={[
                    { label: "Add Version", icon: FaUserPlus, to: "/admin/add-version" },
                    { label: "View Version", icon: FaFolderPlus, to: "/admin/view-version" }
                ]}
                collapsed={collapsed}
            />


            <SidebarSection
                title="Cars"
                icon={FaCar}
                links={[
                    { label: "Add Car", icon: FaUserPlus, to: "/admin/add-post" },
                    { label: "View Cars", icon: FaCar, to: "/admin/view-post" }
                ]}
                collapsed={collapsed}
            />

            <SidebarSection
                title="Settings"
                icon={FaCog}
                links={[
                    { label: "General Settings", icon: FaCog, to: "/admin/settings/general" },
                ]}
                collapsed={collapsed}
            />
        </aside>
    );
}
