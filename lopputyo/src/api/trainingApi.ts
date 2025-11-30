import type { Training } from "../types";

export function getTrainings() {
        return fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
    .then(response => {
    if (!response.ok)
        throw new Error("Error when fetching trainings: " + response.statusText);
    return response.json();
    })
    }

export function getTrainingsWithCustomer() {
        return fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
    .then(response => {
    if (!response.ok)
        throw new Error("Error when fetching customer's training information: " + response.statusText);
    return response.json();
    })
    }

    export function deleteTraining(url: string) {
    return fetch(url, {method: "DELETE"})
    .then(response => {
    if (!response.ok)
        throw new Error("Error when deleting training " + response.statusText)
    return;
    })
    }

export function saveTraining(training: Omit<Training, "_links" | "id">) {
    return fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(training)
    }).then(response => {
        if (!response.ok) throw new Error('Error saving training');
    return response.json();
    });
}
