export const environmentProd = {
  baseUrl: "localhost:8080/api",
  endPoint: {
    forums: {
      getAll: "forums",
      getOne: "forums",
      getOneBySlug: "forums/slug",
      create: "forums",
      delete: "forums"
    },
    subjects: {
      getListSubjectByIdForum: "subject/forum",
      getOne: "subject",
      getListSubjectBySlugForum: "forum/slug",
      create: "subject",
    },
    message: {
      getListMessageByIdSubject: "messages",
      getOne: "messages",
      getListMessageBySlugSubject: "messages/slug",
      create: "messages",
    },
  }
}
