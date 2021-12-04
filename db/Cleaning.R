library(tidyverse)
library(data.table)

db_files <- list.files("Loungeo/ProductAPI/SDC_CSVs", full.names = T)

db_names <- list.files("Loungeo/ProductAPI/SDC_CSVs")

db_list <- lapply(db_files, fread)

names(db_list) <- db_names

style_df <- db_list[["styles.csv"]]

style_df %>%
  distinct(productId, name)

style_df %>%
  add_count(productId, name) %>%
  filter(n > 1)

style_df <- style_df %>%
  distinct(productId, name, .keep_all = T)

fwrite(style_df, file = "Loungeo/ProductAPI/SDC_CSVs/styles.csv")

skus_df <- db_list[["skus.csv"]]

skus_df %>%
  group_by(styleId, size) %>%
  add_count() %>%
  filter(n > 1)

skus_df[6, 3] <- "XXL"

fwrite(skus_df, file = "Loungeo/ProductAPI/SDC_CSVs/skus.csv")