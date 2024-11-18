import { Tab, Nav } from "react-bootstrap";
import BlogLivePage from "../top-stories/BlogLivePage";
import RecentNews from "../recent-news/layout/RecentNews";

const Recentliveblog = ({ dataPost }) => {
    return (
        <div className="post-widget sidebar-post-widget m-b-xs-40">
            <Tab.Container id="recent-live-blog" defaultActiveKey="recent">
                <Nav variant="pills" className="row no-gutters">
                    <Nav.Item className="col">
                        <Nav.Link eventKey="recent">ताजा खबर</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="col">
                        <Nav.Link eventKey="popular">Live Blogs</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="recent">
                        <RecentNews />
                    </Tab.Pane>
                    <Tab.Pane eventKey="popular">
                        <BlogLivePage />
                    </Tab.Pane>

                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default Recentliveblog;
