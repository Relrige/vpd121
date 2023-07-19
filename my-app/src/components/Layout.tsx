import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";

export function Layout() {

    return (
        <div className="App">
            <header>
                <Menu />
            </header>

            {/* active route element */}
            <Outlet />
        </div>
    );
}