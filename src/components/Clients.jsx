import React, { useEffect, useState } from 'react';
import mockData from '../mockData';

const ClientsList = ({ page = 1, limit = 3 }) => {
  const [clients, setClients] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const data = mockData;

    if (data.status) {
      const startIndex = (page - 1) * limit;
      const paginatedClients = data.data.Clients.slice(startIndex, startIndex + limit);
      setClients(paginatedClients);
      setTotalPages(Math.ceil(data.data.Clients.length / limit));
    }
  }, [page, limit]);

  return (
    <div>
      <h1>Список клиентов</h1>
      <ul>
        {clients.map(client => (
          <li key={client.clientid}>
            <h2>{client.surname} {client.name}</h2>
            <p>Дата рождения: {client.dateofbirth}</p>
            <p>Телефон: {client.phone}</p>
            <p>Последний визит: {client.lastvisit}</p>
            <p>Посещения: {client.visits}</p>

            {/* Добавляем информацию о посещениях */}
            {client.Info.Visits.map((visit, index) => (
              <div key={index}>
                <h4>Посещение:</h4>
                <p>Дата: {visit.Date}</p>
                <p>Услуга: {visit.Service}</p>
                <p>Стоимость: {visit.Cost}</p>
                <p>ID сотрудника: {visit.employees_id}</p>
              </div>
            ))}

            {/* Добавляем информацию о статистике */}
            {client.Info.Stats.map((stat, index) => (
              <div key={index}>
                <h4>Статистика:</h4>
                <p>Сумма: {stat.sum}</p>
                <p>Записи: {stat.Records}</p>
                <p>Средний чек: {stat.AverageCheck}</p>
                <p>Последний визит: {stat.lastvisit}</p>
                <p>Пройдено: {stat.Passed}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => {
            const newPage = index + 1;
            const data = mockData;
            const paginatedClients = data.data.Clients.slice((newPage - 1) * limit, newPage * limit);
            setClients(paginatedClients);
            setTotalPages(Math.ceil(data.data.Clients.length / limit));
          }}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Пример использования
const App = () => {
  return (
    <div>
      <ClientsList page={1} limit={3} />
    </div>
  );
};

export default App;
