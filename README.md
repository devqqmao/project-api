# New York Times bestsellers
Сайт по [API NYT](https://developer.nytimes.com/docs/books-product/1/overview) подтягивает данные о книгах-бестселлерах за последние n лет.

Страничка сайта: [API NYT](https://daniliambo.github.io/project-api/)

API sample response for categories:

```JavaScript
// header
{status: 'OK', copyright: 'Copyright (c) 2022 The New York Times Company.  All Rights Reserved.', num_results: 59, results: Array(59)}
// results
{
display_name: "Combined Print & E-Book Fiction",
list_name: "Combined Print and E-Book Fiction",
list_name_encoded: "combined-print-and-e-book-fiction",
newest_published_date: "2022-11-20",
oldest_published_date: "2011-02-13",
updated: "WEEKLY"}
```

API sample response for books:
```JavaScript
{results: 
  {books:
    {
      age_group: "",
      amazon_product_url: "https://www.amazon.com/dp/1668001225?tag=NYTBSREV-20",
      article_chapter_link: "",
      asterisk: 0,
      author: "Colleen Hoover",
      book_image: "https://storage.googleapis.com/du-prd/books/images/9781668001226.jpg",
      book_image_height: 500,
      book_image_width: 322,
      book_review_link: "",
      book_uri: "nyt://book/3aa85e47-4df9-53ef-9957-a77753d3502c",
      buy_links: (6) [{…}, {…}, {…}, {…}, {…}, {…}],contributor: "by Colleen Hoover",
      contributor_note: "",
      dagger: 0,
      description: "In the sequel to “It Ends With Us,” Lily deals with her jealous ex-husband as she reconnects with her first boyfriend.",
      price: "0.00",
      primary_isbn10: "1668001225",
      primary_isbn13: "9781668001226",
      publisher: "Atria",
      rank: 1,
      rank_last_week: 1,
      sunday_review_link: "",
      title: "IT STARTS WITH US",
      weeks_on_list: 3
    }
  }
}
```



Функционал:
1. Сайт распаршивает и отрисовывает json responses от NYT
2. Пользователь может посмотреть любой из 50 разделов
   1. Разделы подгружаются в List name
   2. реализован обрабочтик ошибок, по дефолту выдается "Манга"
3. Реализован поиск по конкретному жанру
4. Реализован поиск по датам
5. Реализована пагинация, если response выдает > 10 книг

Обработка ошибок:
1. У API есть ограничение на кол-во запросов/мин, если API возвращает ошибку, то меняется ключ, по которому делаются запросы
2. Обработана ошибка по пустому возврату API
