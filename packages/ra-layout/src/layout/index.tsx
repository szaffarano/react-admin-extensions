import clsx from "clsx";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification, setSidebarVisibility } from "react-admin";

import { Header } from "./components/header";
import { SideDrawer } from "./components/side-drawer";
import { NestedMenu } from "./components/nested-menu";

import { useStyles } from "./styles";

export type LayoutStylesProps = {
  /**
   * Styles applied to root container
   */
  root?: any;
  /**
   * Styles applied to second container
   */
  container?: any;
  /**
   * Styles applied to appBar
   */
  appBar?: any;
  /**
   * Styles applied to sidebar
   */
  sidebar?: any;
  /**
   * Styles applied to menu list items
   */
   listItem?: any;
};

// TODO: improve typings
export type LayoutProps = {
  Menu?: any;
  AppBar?: any;
  Sidebar?: any;
  items: any[];
  title?: string;
  dashboard?: any;
  layoutStyles?: LayoutStylesProps;
};

export const Layout: React.FC<LayoutProps> = ({
  title,
  items,
  children,
  dashboard,
  AppBar = Header,
  Menu = NestedMenu,
  Sidebar = SideDrawer,
  layoutStyles,
}) => {
  const isSidebarOpen = useSelector((state) => state.admin.ui.sidebarOpen);
  const dispatch = useDispatch();

  const styles = useStyles();

  useEffect(() => {
    dispatch(setSidebarVisibility(true));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSidebarVisibility]);

  return (
    <div className={clsx(styles.root, layoutStyles.root)}>
      <div className={clsx(styles.container, layoutStyles.container)}>
        <AppBar
          title={title}
          open={isSidebarOpen}
          className={clsx({
            [styles.appBar]: true,
            [styles.appBarWhenSidebarOpen]: !!isSidebarOpen,
            [styles.appBarWhenSidebarClosed]: !isSidebarOpen,
            [layoutStyles.appBar]: !!layoutStyles.appBar
          })}
        />
        <main className={styles.contentWithSidebar}>
          <Sidebar layoutStyles={layoutStyles}>
            <Menu items={items} dashboard={dashboard} layoutStyles={layoutStyles} />
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

Layout.defaultProps = {
  layoutStyles: {
    root: {},
    container: {},
    appBar: {},
    listItem: {},
  }
};
