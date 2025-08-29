import './styles/global.css';
import './styles/theme.css';
import { AppRoutes } from './routes';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessageContainer } from './components/MessagesContainer';

export const App = () => {
    return (
        <TaskContextProvider>
            <MessageContainer>
                <AppRoutes />
            </MessageContainer>
        </TaskContextProvider>
    );
};