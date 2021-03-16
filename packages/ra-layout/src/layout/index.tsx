import clsx from "clsx";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification, setSidebarVisibility } from "react-admin";

import { Header } from "./components/header";
import { SideDrawer } from "./components/side-drawer";
import { NestedMenu } from "./components/nested-menu";

import { useStyles } from "./styles";

// TODO: improve typings
export type LayoutProps = {
  Menu?: any;
  AppBar?: any;
  Sidebar?: any;
  items: any[];
  title: string;
  dashboard: any;
};

export const Layout: React.FC<LayoutProps> = ({
  title,
  items,
  children,
  dashboard,
  AppBar = Header,
  Menu = NestedMenu,
  Sidebar = SideDrawer,
}) => {
  const isSidebarOpen = useSelector((state) => state.admin.ui.sidebarOpen);
  const dispatch = useDispatch();

  const styles = useStyles();

  useEffect(() => {
    dispatch(setSidebarVisibility(true));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSidebarVisibility]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <AppBar
          title={title}
          open={isSidebarOpen}
          className={clsx({
            [styles.appBar]: true,
            [styles.appBarWhenSidebarOpen]: !!isSidebarOpen,
            [styles.appBarWhenSidebarClosed]: !isSidebarOpen,
          })}
        />
        <main className={styles.contentWithSidebar}>
          <Sidebar>
            <Menu items={items} dashboard={dashboard} />
          </Sidebar>
          <div
            className={clsx({
              [styles.content]: true,
              [styles.contentWhenSidebarOpen]: !!isSidebarOpen,
              [styles.contentWhenSidebarClosed]: !isSidebarOpen,
            })}
          >
            {children}
          </div>
        </main>
        <Notification />
      </div>
    </div>
  );
};

Layout.displayName = "Layout";
