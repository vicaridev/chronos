import './styles/global.css';
import './styles/theme.css';
import { AppRoutes } from './routes';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';

export const App = () => {
    return (
        <TaskContextProvider>
            <AppRoutes />
        </TaskContextProvider>
    );
};