import { Tab, Nav } from "react-bootstrap";
import PostVideoTwo from "../post/layout/PostVideoTwo";
import PopularWidgetPost from "../common/PopularWidgetPost";
import RecentWidgetPost from "../common/RecentWidgetPost";


const WidgetPost = ({ dataPost }) => {

    return (
        <div className="post-widget sidebar-post-widget m-b-xs-40">
            <Tab.Container id="widget-post" defaultActiveKey="popular">
                <Nav variant="pills" className="row no-gutters">
                   
                    <Nav.Item className="col">
                        <Nav.Link eventKey="popular">POPULAR</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="col">
                        <Nav.Link eventKey="recent">RECENT</Nav.Link>
                    </Nav.Item>



                </Nav>

                <Tab.Content>
                   
                    <Tab.Pane eventKey="popular">
                        <PopularWidgetPost pClass="" />
                    </Tab.Pane>
                    <Tab.Pane eventKey="recent">
                        <RecentWidgetPost pClass="" />
                    </Tab.Pane>

                </Tab.Content>

            </Tab.Container>
        </div>
    );
};

export default WidgetPost;
