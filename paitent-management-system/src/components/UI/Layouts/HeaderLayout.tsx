import React from "react";
import classnames from "classnames";

interface Props {
    children?: React.ReactNode;
    className?: string;
    tab?: boolean;
    breadcrumb?: boolean;
}
export default function HeaderLayout(props: Props) {
    return <div className={classnames("section-header", { 'withTab': props.tab })}>{props.children}</div>;
};
