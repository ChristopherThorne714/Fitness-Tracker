// @vitest-environment jsdom
import { describe, expect, test, vi } from 'vitest';
import { render, screen, unmount } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Home from '../pages/Home';

const mockUseNavigate = vi.fn();
    vi.mock('react-router-dom', () => ({
        ...vi.importActual('react-router-dom'),
        useNavigate: () => mockUseNavigate,
    }));

describe("Home component", () => {
    const mockWorkouts = [{
        "createdAt" : "2024-09-10T21:49:14.229Z",
        "distance" : "456",
        "musclegroup" : "Forearms",
        "performedOn" : "2024-09-06T00:00:00.000Z",
        "sort" : "Distance",
        "title" : "something wild",
        "updatedAt" : "2024-09-10T21:49:14.229Z",
        "user" : "a@a",
        "__t" : "Distance",
        "__v" : "0",
        "_id" : "66e0beda45d36ef4160f47ce",
    },
    {
        "createdAt" : "2024-09-06T17:31:56.434Z",
        "distance" : "0999:9:9",
        "musclegroup" : "Cardio",
        "performedOn" : "2024-09-06T00:00:00.000Z",
        "sort" : "Duration",
        "title" : "something crazy",
        "updatedAt" : "2024-09-06T17:31:56.434Z",
        "user" : "a@a",
        "__t" : "Duration",
        "__v" : "0",
        "_id" : "66db3c8caab6fa42e5004a2a",
    }];
    const initialState = {workouts: mockWorkouts, auth: 'a@a', date: '2024-09-06'};
    const mockStore = configureStore();
    let store;

    test("renders home with workout cards", () => {
        store = mockStore(initialState)
        const { container, unmount } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        expect(container.querySelectorAll('div.card-container')).toBeDefined();
        unmount();
    });

    test("renders form toggle svg", () => {
        store = mockStore(initialState)
        const { unmount } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        expect(screen.getAllByTitle('form-toggle').length).toBe(1);
        unmount();
    });

    test("renders workout form", async () => {
        const user = userEvent.setup();
        store = mockStore(initialState)
        const { unmount } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        await user.click(screen.getByTitle('form-toggle'));
        expect(screen.getByRole('form', {name: ''})).toBeDefined();
        unmount();
    });
});